
export enum Category {
  REVIEWS = "Reviews",
  INFLUENTIAL = "Influential Papers",
  APPLICATIONS = "Applications",
  METHODS = "Methods",
  // Legacy support if needed, though these are now separate views
  SOFTWARE = "Software", 
  DATASETS = "Datasets" 
}

export interface Resource {
  id: string; // UUID or DOI based
  doi: string;
  title: string;
  authors: string[];
  journal: string;
  date_published: string; // YYYY-MM-DD
  abstract: string;
  summary: string;
  category: Category;
  url: string;
}

export interface Dataset {
  name: string;
  url: string;
  doi: string;
  description: string;
  paperUrl?: string; // Fallback reference link when no DOI has been assigned yet
}

export interface Software {
  name: string;
  url: string; // Github/Repository
  doi: string; // Associated Paper
  description: string;
  tags: string[]; // Purpose tags (e.g., Feature Extraction)
}
