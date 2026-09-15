
import React from 'react';
import { Software } from '../types';

interface SoftwareProps {
  tools: Software[];
}

export const SoftwareTools: React.FC<SoftwareProps> = ({ tools }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-academic-50 text-academic-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
           <i className="fa-solid fa-terminal"></i>
           <span>Computational ecosystem</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
          Software & <span className="text-academic-600">tools</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 font-medium leading-relaxed">
          Essential open-source software, libraries, and pipelines for image-based profiling analysis. From feature extraction to high-dimensional data processing.
        </p>
      </div>

      <h2 className="sr-only">Software tools list</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tools.map((tool, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-academic-100 transition-all flex flex-col h-full group"
          >
            <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-academic-600 group-hover:bg-academic-50 transition-all">
                        <i className="fa-solid fa-code text-2xl"></i>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-academic-50 text-academic-700 border border-academic-100">
                        Open source
                    </span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-academic-600 transition-colors">
                    {tool.name}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    {tool.description}
                </p>
            </div>

            <div className="bg-slate-50/50 px-8 py-6 border-t border-slate-100 flex gap-4">
                <a 
                    href={tool.url}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-5 py-3 border border-slate-200 shadow-sm text-sm font-black rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
                    aria-label={`View source code for ${tool.name}`}
                >
                    <i className="fa-brands fa-github mr-2 text-lg"></i>
                    Code
                </a>
                {tool.doi && tool.doi !== 'N/A' && (
                    <a 
                        href={`https://doi.org/${tool.doi}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 inline-flex justify-center items-center px-5 py-3 border border-transparent text-sm font-black rounded-xl text-white bg-academic-600 hover:bg-academic-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-academic-100"
                        aria-label={`Read research paper for ${tool.name}`}
                    >
                        <i className="fa-solid fa-book-open mr-2"></i>
                        Paper
                    </a>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};