import React, { useState, useMemo } from 'react';
import { Resource, Category } from '../types';

interface ResourceCardProps {
  resource: Resource;
  viewMode?: 'grid' | 'list';
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, viewMode = 'grid' }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const isInfluential = resource.category === Category.INFLUENTIAL;
  const year = new Date(resource.date_published).getFullYear();

  // "Last name, first name letter initial et al." logic
  const authorDisplay = useMemo(() => {
    if (!resource.authors || resource.authors.length === 0) return 'Unknown Author';
    const firstAuthor = resource.authors[0];
    
    // Check if the array contains "et al." or if there are multiple authors
    const hasMore = resource.authors.length > 1 || resource.authors.some(a => a.toLowerCase().includes('et al'));
    
    // If it already includes "et al", just take the first part
    if (firstAuthor.toLowerCase().includes('et al')) return firstAuthor;
    
    return hasMore ? `${firstAuthor} et al.` : firstAuthor;
  }, [resource.authors]);

  const copyCitation = () => {
    const hasDoi = resource.doi && resource.doi.trim() !== '' && resource.doi.toUpperCase() !== 'N/A';
    navigator.clipboard.writeText(hasDoi ? resource.doi : resource.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- List View Layout ---
  if (viewMode === 'list') {
    return (
      <div 
        className={`
          group bg-white rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]
          border-2 ${isInfluential ? 'border-academic-200 bg-academic-50/10' : 'border-slate-100'}
          flex flex-col sm:flex-row gap-6 p-6 sm:p-8 relative
        `}
      >
        {/* Date & Type Column */}
        <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:w-32 flex-shrink-0">
          <span className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">{year}</span>
          <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
              ${isInfluential ? 'bg-academic-600 text-white' : 'bg-slate-800 text-white'}
            `}>
              {resource.category}
          </span>
          {isInfluential && (
            <div className="flex items-center gap-1.5 text-academic-600 font-black text-[10px] mt-1 uppercase tracking-widest">
               <i className="fa-solid fa-star text-xs"></i>
               <span>Essential</span>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-2">
             <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight group-hover:text-academic-600 transition-colors">
                <a href={resource.url} target="_blank" rel="noreferrer">
                  {resource.title}
                </a>
             </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mb-4">
             <span className="font-black text-slate-900 uppercase tracking-widest text-xs">{resource.journal}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
             <span className="font-bold text-academic-600">{authorDisplay}</span>
          </div>

          <p className="text-slate-600 font-medium leading-relaxed line-clamp-2 max-w-4xl text-lg">
            {resource.summary}
          </p>

          {expanded && (
            <div className="mt-6 p-6 bg-slate-50 rounded-2xl text-slate-700 border border-slate-100 animate-page-enter shadow-inner">
               <div className="flex items-center justify-between mb-4">
                  <strong className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Abstract</strong>
                  <span className="text-[10px] text-slate-400 font-black tracking-widest">{resource.doi}</span>
               </div>
               <p className="leading-relaxed font-medium text-lg">{resource.abstract}</p>
            </div>
          )}
        </div>

        {/* Utility Actions */}
        <div className="flex sm:flex-col gap-3 justify-center sm:border-l sm:border-slate-100 sm:pl-6 opacity-100 sm:opacity-40 group-hover:opacity-100 transition-all">
           <a 
              href={resource.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center h-12 w-12 text-slate-400 hover:text-academic-600 hover:bg-academic-50 rounded-xl transition-all hover:scale-110"
              title="Open Article"
              aria-label="Open original article"
            >
              <i className="fa-solid fa-external-link text-xl"></i>
           </a>
           <button
              onClick={copyCitation}
              className={`flex items-center justify-center h-12 w-12 rounded-xl transition-all hover:scale-110 ${copied ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-academic-600 hover:bg-academic-50'}`}
              title="Copy DOI"
              aria-label="Copy DOI to clipboard"
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-xl`}></i>
           </button>
           <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center h-12 w-12 text-slate-400 hover:text-academic-600 hover:bg-academic-50 rounded-xl transition-all hover:scale-110"
              title={expanded ? "Collapse" : "Expand Details"}
              aria-label={expanded ? "Collapse abstract" : "Expand abstract"}
            >
              <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xl`}></i>
           </button>
        </div>
      </div>
    );
  }

  // --- Grid View Layout ---
  return (
    <div 
      className={`
        bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group
        border-2 ${isInfluential ? 'border-academic-200 shadow-xl shadow-academic-100/20' : 'border-slate-100'}
        flex flex-col h-full hover:-translate-y-2
      `}
    >
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
             <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
              ${isInfluential ? 'bg-academic-600 text-white' : 'bg-slate-800 text-white'}
            `}>
              {resource.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-600 tracking-widest border border-slate-200">
              {year}
            </span>
          </div>
          {isInfluential && (
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-academic-50 text-academic-600 shadow-sm">
               <i className="fa-solid fa-star"></i>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-academic-600 transition-colors">
          <a href={resource.url} target="_blank" rel="noreferrer">
            {resource.title}
          </a>
        </h3>

        <div className="flex flex-col gap-1.5 mb-6">
          <div className="text-xs font-black text-slate-900 uppercase tracking-[0.15em] truncate">
            {resource.journal}
          </div>
          <div className="text-sm font-bold text-academic-600">
            {authorDisplay}
          </div>
        </div>

        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 mb-6 group-hover:bg-academic-50/50 transition-colors">
          <p className="text-slate-700 font-medium italic leading-relaxed">
            "{resource.summary}"
          </p>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-slate-100 animate-page-enter">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Abstract</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {resource.abstract}
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
        <div className="flex gap-3">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] font-black text-slate-400 hover:text-academic-600 uppercase tracking-widest px-3 py-2 rounded-xl hover:bg-white transition-all shadow-sm"
              aria-label={expanded ? "Hide abstract" : "Show abstract"}
            >
              {expanded ? 'Less' : 'Abstract'}
            </button>
            <button
              onClick={copyCitation}
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl transition-all shadow-sm ${copied ? 'text-green-600 bg-white' : 'text-slate-400 hover:text-academic-600 hover:bg-white'}`}
              aria-label="Copy DOI"
            >
              {copied ? 'Copied' : 'Cite'}
            </button>
        </div>
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[10px] font-black text-white bg-academic-600 px-5 py-2.5 rounded-xl hover:bg-academic-700 transition-all shadow-xl shadow-academic-100 hover:scale-105 active:scale-95"
          aria-label={`Open DOI for ${resource.title}`}
        >
          <span>OPEN DOI</span>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  );
};