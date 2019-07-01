# Awesome Cytodata [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of awesome cytodata resources.


## Contents

- [Software](#software)
- [Datasets](#datasets)
- [Publications](#publications)
  - [Review](#review)
  - [Software](#software-1)
  - [Applications](#applications)
  - [Assays and data collection](#assays-and-data-collection)
  - [Feature extraction](#feature-extraction)
  - [Data preparation](#data-preparation)
  - [Profiling](#profiling)
  - [Analysis](#analysis)

## Software

Open source software packages for image-based profiling of biological phenotypes.

- [Advanced Cell Classifier](https://www.cellclassifier.org/) Advanced Cell Classifier is a data analyzer program to evaluate cell-based high-content screens and tissue section images.
- [CellProfiler](http://cellprofiler.org/) CellProfiler is a free open-source software for measuring and analyzing cell images.
- [CellProfiler Analyst](http://cellprofiler.org/cp-analyst/) Interactive data exploration, analysis, and classification of large biological image sets.
- [Cytominer](https://github.com/cytomining/cytominer) Methods for image-based cell profiling.
- [EBImage](https://github.com/aoles/EBImage) Image processing toolbox for R.
- [HTSvis](http://htsvis.dkfz.de/HTSvis/) A web app for exploratory data analysis and visualization of arrayed high-throughput screens.


## Datasets

Annotated datasets for image-based profiling.

- [Broad Bioimage Benchmark Collection](https://data.broadinstitute.org/bbbc/) The Broad Bioimage Benchmark Collection (BBBC) is a collection of freely downloadable microscopy image sets. In addition to the images themselves, each set includes a description of the biological application and some type of "ground truth" (expected results).
- [RxRx1](https://www.rxrx.ai) RxRx1 is a set of 125,514 high-resolution 512x512 6-channel fluorescence microscopy images of human cells under 1,108 genetic perturbations in 51 experimental batches across four cell types.  The images were produced by Recursion Pharmaceuticals in their labs in Salt Lake City, Utah.  Researchers will use this dataset for studying and benchmarking methods for dealing with biological batch effects, as well as areas in machine learning such as domain adaptation, transfer learning, and k-shot learning.


## Publications

Publications related to image-based profiling.


### Review

- [Data-analysis strategies for image-based cell profiling](https://doi.org/10.1038/nmeth.4397) Introduce the steps required to create high-quality image-based (i.e., morphological) profiles from a collection of microscopy images.
- [High-content screening for quantitative cell biology](https://doi.org/10.1016/j.tcb.2016.03.008) Describe some recent applications of HCS, ranging from the identification of genes required for specific biological processes to the characterization of genetic interactions.
- [Microscopy-based high-content screening](https://doi.org/10.1016/j.cell.2015.11.007) Describe the state of the art for image-based screening experiments and delineate experimental approaches and image-analysis approaches as well as discussing challenges and future directions, including leveraging CRISPR/Cas9-mediated genome engineering.


### Applications

#### Genetic profiling

- [Discovering metabolic disease gene interactions by correlated effects on cellular morphology](https://doi.org/10.1016/j.molmet.2019.03.001) Profiling disease-gene interaction during adipocyte differentiation.
- [Phenotypic profiling of the human genome by time-lapse microscopy reveals cell division genes](https://doi.org/10.1038/nature08869) This study provides an in-depth analysis of cell division phenotypes and makes the entire high-content data set available as a resource to the community.

#### Compound profiling

- [Image-based multivariate profiling of drug responses from single cells](https://doi.org/10.1038/nmeth1032) a multivariate method for classifying untreated and treated human cancer cells based on ∼300 single-cell phenotypic measurements.

### Methods

#### Assays and data collection

- [Cell Painting, a high-content image-based assay for morphological profiling using multiplexed fluorescent dyes](https://doi.org/10.1038/nprot.2016.105) Protocol describing the design and execution of experiments using Cell Painting.
- [Multiplex Cytological Profiling Assay to Measure Diverse Cellular States](https://doi.org/10.1371/journal.pone.0080999) Cell Painting assay.

#### Image data processing, segmentation and feature extraction

- [CIDRE: an illumination-correction method for optical microscopy](https://doi.org/10.1038/nmeth.3323) Retrospective method for illumination-correction based on energy minimization.
- [Retrospective shading correction based entropy minimization](https://doi.org/10.1046/j.1365-2818.2000.00669.x) Method for retrospective shading correction based on entropy minimization.

#### Feature selection

- [Minimum redundancy feature selection from microarray gene expression data](https://doi.org/10.1142/S0219720005001004) Minimum redundancy - maximum relevance feature selection framework.

#### Representation learning

- [Weakly supervised learning of single-cell feature embeddings](https://doi.org/10.1109/CVPR.2018.00970) Training CNNs using a weakly supervised approach for feature learning.

### Software

- [CellProfiler: image analysis software for identifying and quantifying cell phenotypes](https://doi.org/10.1186/gb-2006-7-10-r100) Describe the first free, open-source system designed for flexible, high-throughput cell image analysis, CellProfiler.
- [CellProfiler Analyst: data exploration and analysis software for complex image-based screens](https://doi.org/10.1186/1471-2105-9-482) Describe an open-source software package called "CellProfiler Analyst".
- [Improved structure, function and compatibility for CellProfiler: modular high-throughput image analysis software](https://doi.org/10.1093/bioinformatics/btr095) describe CellProfiler 2.0, which has been engineered to meet the needs of its growing user base. It is more robust and user friendly, with new algorithms and features to facilitate high-throughput work.


## Contribute

Contributions welcome! Read the [contribution guidelines](contributing.md) first.


## License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](http://creativecommons.org/publicdomain/zero/1.0)
