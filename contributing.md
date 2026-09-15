# Contributing to Awesome CytoData

We welcome contributions from the community! This project is a curated knowledge hub for image-based profiling, and your input helps keep it up-to-date and comprehensive.

## How to Contribute

The easiest way to contribute is by adding or updating records in our data files. You don't need deep coding knowledge: just a basic understanding of JSON.

### 1. Add a Research Paper (Literature)
Papers are stored in `data/papers.json`. 

**Steps:**
1. Fork the repository.
2. Open `data/papers.json`.
3. Add a new entry to the end of the array.
4. **Author Formatting Rule:** Please use the format `Lastname, F. I.` (Family name followed by First initial and Middle initial). The website automatically appends "et al." for display.

**Example Paper Entry:**
```json
{
  "id": "10.1038/s41592-024-02399-z",
  "doi": "10.1038/s41592-024-02399-z",
  "title": "A standard format for morphological profiling data",
  "authors": ["Way, G. P.", "Chandrasekaran, S. N.", "Carpenter, A. E."],
  "journal": "Nature Methods",
  "date_published": "2024-09-15",
  "abstract": "The authors propose a standardized data structure to improve interoperability...",
  "summary": "Introduction of the CytoData data standard for morphological profiles.",
  "category": "Methods",
  "url": "https://doi.org/10.1038/s41592-024-02399-z"
}
```

### 2. Add a Dataset
Datasets are stored in `data/datasets.json`.

**Steps:**
1. Fork the repository.
2. Open `data/datasets.json`.
3. Add a new entry to the array.

**Example Dataset Entry:**
```json
{
  "name": "JUMP-CP Production Dataset",
  "url": "https://github.com/jump-cellpainting/datasets",
  "doi": "10.1101/2023.03.23.534023",
  "description": "The Joint Undertaking for Morphological Profiling (JUMP) Cell Painting dataset contains ~140,000 small molecule and genetic perturbations."
}
```

### 3. Add Software
Software tools are stored in `data/software.json`.

**Example Software Entry:**
```json
{
  "name": "CytoTable",
  "url": "https://github.com/cytomining/CytoTable",
  "doi": "N/A",
  "description": "A tool to convert image-based profiling data into parquet files for efficient analysis.",
  "tags": ["Data Engineering", "ETL"]
}
```

## Submission Guidelines

- **DOI:** Always provide a DOI if available. It helps us link to the correct publisher page.
- **Dataset metadata:** Where known, mention type, size, and dimensions as a short trailing sentence in the dataset `description` (e.g. "Type: ... Size: ... Dimensions: ...").
- **Summary:** Keep the summary to 1-2 sentences. Focus on the *impact* or *utility* of the resource.
- **Categories:** Use existing categories: `Biology`, `Reviews`, `Influential Papers`, `Applications`, `Methods`.
- **Verification:** Ensure your JSON is valid (no trailing commas in the last element, all quotes are double quotes).

## Pull Request Process

1. Create a branch for your changes (`git checkout -b add-my-paper`).
2. Commit your changes with a descriptive message (`git commit -m "Add Way et al. 2024 to resources"`).
3. Push to your fork and submit a Pull Request.
4. Our automated CI will check the JSON format. If it passes, a maintainer will review and merge it!

Thank you for helping build the CytoData community!