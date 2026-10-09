#!/usr/bin/env python3
"""Add a paper or dataset to the JSON files the website reads from public/data/.

Needs only Python 3.8+ (standard library, nothing to install).
Run with --help for usage.
"""

import argparse
import datetime
import html
import json
import re
import shlex
import sys
import urllib.parse
import urllib.request
from pathlib import Path

try:
    import readline  # noqa: F401  (line editing in the prompts, where available)
except ImportError:
    pass

DATA_DIR = Path(__file__).resolve().parent.parent / "public" / "data"

# Keep in sync with the paper categories in types.ts
CATEGORIES = ["Reviews", "Influential Papers", "Applications", "Methods"]

DESCRIPTION = """Add a paper or dataset to the Awesome CytoData website.

Anything you leave out is asked for interactively. For papers, the title,
authors, journal, date and abstract are looked up from the DOI."""

EXAMPLES = """examples:
  python3 scripts/add_resource.py paper --doi 10.1038/s41592-024-02399-z \\
    --category Methods --summary "Open resource of Cell Painting image sets."
  python3 scripts/add_resource.py dataset --name "My Dataset" \\
    --url https://example.org/data --doi 10.1101/2024.01.01.123456 \\
    --description "10,000 Cell Painting images of U2OS cells."
"""


def fail(message):
    print(f"Error: {message}", file=sys.stderr)
    sys.exit(1)


def parse_args():
    parser = argparse.ArgumentParser(
        usage="%(prog)s {paper,dataset} [options]",
        description=DESCRIPTION,
        epilog=EXAMPLES,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("kind", nargs="?", choices=["paper", "dataset"], help="what to add")
    parser.add_argument("--dry-run", action="store_true", help="show the entry without writing it")

    shared = parser.add_argument_group("paper and dataset options")
    shared.add_argument("--doi", help="DOI or doi.org link of the paper (omit if there is none)")
    shared.add_argument("--url", help="link to the dataset, or to the paper (default: https://doi.org/<doi>)")

    paper = parser.add_argument_group("paper options")
    paper.add_argument("--category", help=f"one of: {', '.join(CATEGORIES)}")
    paper.add_argument("--summary", help="1-2 sentences on the impact or utility of the paper")
    paper.add_argument("--title", help="override the looked-up title")
    paper.add_argument("--authors", help='semicolon-separated, e.g. "Way, G.P.; Carpenter, A.E."')
    paper.add_argument("--journal", help="override the looked-up journal")
    paper.add_argument("--date", metavar="YYYY-MM-DD", help="override the looked-up publication date")
    paper.add_argument("--abstract", help="override the looked-up abstract")

    dataset = parser.add_argument_group("dataset options")
    dataset.add_argument("--name", help="dataset name")
    dataset.add_argument("--description", help="what it contains; where known, end with type/size/dimensions")
    dataset.add_argument("--paper-url", metavar="URL", help="reference link, used only when there is no DOI")
    return parser.parse_args()


# --- Field checks: return the cleaned value or raise ValueError with a message for the user ---


def check_text(value):
    cleaned = " ".join(value.split())
    if not cleaned:
        raise ValueError("cannot be empty")
    return cleaned


def check_doi(value):
    cleaned = re.sub(r"^(https?://(dx\.)?doi\.org/|doi:\s*)", "", value.strip(), flags=re.IGNORECASE)
    if re.fullmatch(r"n/?a", cleaned, flags=re.IGNORECASE):
        return "N/A"
    if not re.fullmatch(r"10\.\d{4,9}/\S+", cleaned):
        raise ValueError(f'"{value}" is not a DOI (expected something like 10.1038/nmeth.4397)')
    return cleaned


def check_url(value):
    cleaned = value.strip()
    parts = urllib.parse.urlparse(cleaned)
    if parts.scheme not in ("http", "https") or not parts.netloc or " " in cleaned:
        raise ValueError(f'"{value}" is not an http(s) URL')
    return cleaned


def check_date(value):
    cleaned = value.strip()
    try:
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", cleaned):
            raise ValueError
        datetime.date.fromisoformat(cleaned)
    except ValueError:
        raise ValueError(f'"{value}" is not a YYYY-MM-DD date') from None
    return cleaned


def check_category(value):
    for category in CATEGORIES:
        if category.lower() == value.strip().lower():
            return category
    raise ValueError(f'"{value}" is not one of: {", ".join(CATEGORIES)}')


def check_authors(value):
    names = value if isinstance(value, list) else value.split(";")
    names = [name.strip() for name in names if name.strip()]
    if not names:
        raise ValueError("needs at least one author")
    return names


class Form:
    """Resolves each field from its --flag, then a looked-up value, then a prompt."""

    def __init__(self, args):
        self.args = args
        self.interactive = sys.stdin.isatty() and sys.stdout.isatty()
        self.missing = []

    def ask(self, label):
        return input(f"{label}: ").strip()

    def get(self, flag, label, check, preset=None, fallback=None):
        """`fallback` is used when the prompt is left blank or there is no terminal."""
        given = getattr(self.args, flag.replace("-", "_"))
        if given is None:
            given = preset
        if given is not None:
            try:
                return check(given)
            except ValueError as err:
                fail(f"--{flag}: {err}")
        if not self.interactive:
            if fallback is None:
                self.missing.append(f"--{flag}")
            return fallback
        while True:
            answer = self.ask(label)
            if not answer and fallback is not None:
                return fallback
            try:
                return check(answer)
            except ValueError as err:
                print(f"  {err}")


# --- DOI metadata lookup (works for Crossref and DataCite DOIs, e.g. journals, bioRxiv, arXiv) ---


def strip_markup(value):
    value = re.sub(r"<jats:title>[^<]*</jats:title>", " ", value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    return " ".join(html.unescape(value).split())


def first(value):
    if isinstance(value, list):
        return value[0] if value else ""
    return value or ""


def initials(given):
    """ "Gregory P." -> "G.P.", matching the author style used in papers.json"""
    parts = given.replace(".", " ").split()
    return "".join("-".join(f"{p[0].upper()}." for p in part.split("-") if p) for part in parts)


def format_author(author):
    family = author.get("family")
    if not family:
        return author.get("literal") or author.get("name") or ""
    given = author.get("given")
    return f"{family}, {initials(given)}" if given else family


def lookup_doi(doi):
    request = urllib.request.Request(
        "https://doi.org/" + urllib.parse.quote(doi, safe="/"),
        headers={
            "Accept": "application/vnd.citationstyles.csl+json",
            "User-Agent": "awesome-cytodata-add-resource",
        },
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        csl = json.load(response)

    date_parts = first((csl.get("issued") or {}).get("date-parts"))
    date = ""
    if date_parts and date_parts[0]:
        year, month, day = (list(date_parts) + [1, 1])[:3]
        date = f"{int(year):04d}-{int(month):02d}-{int(day):02d}"
    # Preprints have no container title; fall back to the server name (bioRxiv, arXiv)
    journal = (
        first(csl.get("container-title"))
        or first(csl.get("institution") or [{}]).get("name")
        or csl.get("publisher")
    )
    found = {
        "title": strip_markup(first(csl.get("title"))),
        "authors": [a for a in map(format_author, csl.get("author") or []) if a],
        "journal": strip_markup(journal),
        "date": date,
        "abstract": strip_markup(csl.get("abstract")),
    }
    # Drop anything the record did not have so those fields are asked for instead
    return {key: value for key, value in found.items() if value}


# --- Reading and writing the data files ---


def load(path):
    raw = path.read_text(encoding="utf-8")
    try:
        return raw, json.loads(raw)
    except ValueError as err:
        fail(f"{path.name} is not valid JSON, fix it before adding entries ({err})")


def append(path, raw, entries, entry):
    """Append as text rather than re-serialising, so existing entries keep their
    formatting and the pull request diff only shows the new entry."""
    fields = []
    for key, value in entry.items():
        if isinstance(value, list):
            encoded = "[" + ", ".join(json.dumps(v, ensure_ascii=False) for v in value) + "]"
        else:
            encoded = json.dumps(value, ensure_ascii=False)
        fields.append(f"    {json.dumps(key)}: {encoded}")
    block = "  {\n" + ",\n".join(fields) + "\n  }"
    end = raw.rindex("]")
    updated = raw[:end].rstrip() + ("," if entries else "") + f"\n{block}\n" + raw[end:]
    json.loads(updated)
    with open(path, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(updated)


def same(a, b):
    return a.strip().lower() == b.strip().lower()


# --- Builders ---


def build_paper(form, entries):
    doi = form.get("doi", "DOI (leave blank if the paper has none)", check_doi, fallback="N/A")
    has_doi = doi != "N/A"
    if has_doi and any(same(p["doi"], doi) or same(p["id"], doi) for p in entries):
        fail(f"a paper with DOI {doi} is already in papers.json")

    found = {}
    if has_doi:
        print(f"Looking up {doi} ...")
        try:
            found = lookup_doi(doi)
        except (OSError, ValueError) as err:
            print(f"Could not look up the DOI ({err}); the details are needed by hand.")

    title = form.get("title", "Title", check_text, preset=found.get("title"))
    authors = form.get(
        "authors", 'Authors as "Lastname, F.I.", separated by ;', check_authors, preset=found.get("authors")
    )
    journal = form.get("journal", "Journal or preprint server", check_text, preset=found.get("journal"))
    date = form.get("date", "Publication date (YYYY-MM-DD)", check_date, preset=found.get("date"))
    category = form.get("category", f"Category ({' | '.join(CATEGORIES)})", check_category)
    summary = form.get("summary", "Summary (1-2 sentences on impact or utility)", check_text)
    abstract = form.get(
        "abstract",
        "Abstract (leave blank to reuse the summary)",
        check_text,
        preset=found.get("abstract"),
        fallback=summary or "",
    )
    url = form.get("url", "Link to the paper", check_url, preset=f"https://doi.org/{doi}" if has_doi else None)
    if abstract == summary and not form.interactive and not form.missing:
        print("No abstract is available, so the summary is reused. Pass --abstract to set one.")

    return {
        "id": doi if has_doi else re.sub(r"^https?://", "", url or "", flags=re.IGNORECASE),
        "doi": doi,
        "title": title,
        "authors": authors,
        "journal": journal,
        "date_published": date,
        "abstract": abstract,
        "summary": summary,
        "category": category,
        "url": url,
    }


def build_dataset(form, entries):
    name = form.get("name", "Dataset name", check_text)
    url = form.get("url", "Dataset URL", check_url)
    for existing in entries:
        if (name and same(existing["name"], name)) or (url and same(existing["url"], url)):
            fail(f'"{existing["name"]}" is already in datasets.json')

    doi = form.get("doi", "DOI of the associated paper (leave blank if none)", check_doi, fallback="N/A")
    paper_url = ""
    if doi == "N/A":
        paper_url = form.get("paper-url", "Reference link (leave blank if none)", check_url, fallback="")
    description = form.get("description", "Description", check_text)

    entry = {"name": name, "url": url, "doi": doi}
    if paper_url:
        entry["paperUrl"] = paper_url
    entry["description"] = description
    return entry


TARGETS = {
    "paper": ("papers.json", build_paper, "title"),
    "dataset": ("datasets.json", build_dataset, "name"),
}


def main():
    args = parse_args()
    form = Form(args)

    kind = args.kind
    if kind is None and form.interactive:
        kind = form.ask("Add a paper or a dataset").lower()
    if kind not in TARGETS:
        fail('say what to add: "paper" or "dataset".\nRun with --help for usage.')
    filename, build, label = TARGETS[kind]

    path = DATA_DIR / filename
    raw, entries = load(path)
    entry = build(form, entries)
    if form.missing:
        fail(f"missing required options: {', '.join(form.missing)}\nRun with --help for usage.")

    print(f"\n{json.dumps(entry, indent=2, ensure_ascii=False)}\n")
    if args.dry_run:
        print(f"Dry run: nothing was written to public/data/{filename}.")
        return

    append(path, raw, entries, entry)
    print(
        f"""Added to public/data/{filename}. To submit it:

  git checkout -b add-{kind}
  git add public/data/{filename}
  git commit -m {shlex.quote(f"Add {entry[label]}")}
  git push -u origin add-{kind}

Then open a pull request on GitHub (see contributing.md)."""
    )


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print("\nCancelled, nothing was written.")
        sys.exit(130)
