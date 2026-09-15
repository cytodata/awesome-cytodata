
import React, { useState, useMemo } from 'react';
import { Dataset } from '../types';

interface DatasetsProps {
  datasets: Dataset[];
}

export const Datasets: React.FC<DatasetsProps> = ({ datasets }) => {
  const [query, setQuery] = useState('');

  const filteredDatasets = useMemo(() => {
    if (!query.trim()) return datasets;
    const lowerQuery = query.toLowerCase();
    return datasets.filter(d => 
      d.name.toLowerCase().includes(lowerQuery) || 
      d.description.toLowerCase().includes(lowerQuery) ||
      d.doi.toLowerCase().includes(lowerQuery)
    );
  }, [datasets, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-academic-50 text-academic-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
           <i className="fa-solid fa-server"></i>
           <span>Data repository</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
          Publicly available <span className="text-academic-600">datasets</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 font-medium leading-relaxed">
          A curated list of high-content screening and image-based profiling datasets available for research and benchmarking.
        </p>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto relative mt-12">
           <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-slate-400"></i>
           </div>
           <input
              type="text"
              className="block w-full pl-14 pr-6 py-5 border-2 border-slate-100 rounded-[2rem] leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-academic-100 focus:border-academic-500 shadow-xl shadow-slate-100 transition-all font-bold text-slate-900"
              placeholder="Search datasets (e.g., segmentation, COVID, cell painting')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search datasets"
           />
        </div>
      </div>

      <div className="overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 rounded-[2.5rem] bg-white">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/50">
                <tr>
                <th scope="col" className="py-6 pl-8 pr-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest w-1/4">
                    Dataset name
                </th>
                <th scope="col" className="px-4 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest w-1/2">
                    Description
                </th>
                <th scope="col" className="px-4 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Access
                </th>
                <th scope="col" className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Reference
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.map((dataset, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="whitespace-normal py-8 pl-8 pr-4 text-lg font-black text-slate-900 align-top group-hover:text-academic-600 transition-colors">
                          {dataset.name}
                      </td>
                      <td className="px-4 py-8 text-slate-600 align-top font-medium leading-relaxed break-words">
                          {dataset.description}
                      </td>
                      <td className="whitespace-nowrap px-4 py-8 text-sm align-top">
                          <a 
                              href={dataset.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center px-5 py-2.5 border border-transparent text-xs font-black rounded-xl shadow-lg text-white bg-academic-600 hover:bg-academic-700 transition-all hover:scale-105 active:scale-95 shadow-academic-100"
                              aria-label={`View data for ${dataset.name}`}
                          >
                              <i className="fa-solid fa-database mr-2"></i>
                              Go to data
                          </a>
                      </td>
                      <td className="whitespace-nowrap px-8 py-8 text-sm text-slate-500 align-top">
                          {dataset.doi && dataset.doi !== 'N/A' ? (
                              <a
                                  href={`https://doi.org/${dataset.doi}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-academic-600 hover:text-academic-800 font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all"
                                  aria-label={`Read paper for ${dataset.name}`}
                              >
                                  <span>Paper</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          ) : dataset.paperUrl ? (
                              <a
                                  href={dataset.paperUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-academic-600 hover:text-academic-800 font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all"
                                  aria-label={`Read paper for ${dataset.name}`}
                              >
                                  <span>Paper</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          ) : (
                              <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">N/A</span>
                          )}
                      </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-database text-slate-200 text-2xl"></i>
                      </div>
                      <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No datasets found matching your search.</p>
                    </td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
