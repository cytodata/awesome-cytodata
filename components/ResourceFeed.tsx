import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';
import { Resource, Category } from '../types';
import { ResourceCard } from './ResourceCard';

interface ResourceFeedProps {
  resources: Resource[];
}

const allCategories = ['All Categories', ...Object.values(Category)];
const ITEMS_PER_PAGE = 15;

export const ResourceFeed: React.FC<ResourceFeedProps> = ({ resources }) => {
  // Filters
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // View State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Refs for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Derive available years from data
  const availableYears = useMemo(() => {
    const years = new Set<number>(resources.map(r => new Date(r.date_published).getFullYear()));
    return ['All Years', ...Array.from(years).sort((a: number, b: number) => b - a).map(String)];
  }, [resources]);

  // Configure Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(resources, {
      keys: ['title', 'summary', 'authors', 'journal', 'abstract', 'doi'],
      threshold: 0.3,
      distance: 100,
    });
  }, [resources]);

  // Filter & Sort Logic
  const filteredResources = useMemo(() => {
    let results = resources;

    if (query.trim()) {
      results = fuse.search(query).map(result => result.item);
    }

    if (selectedCategory !== 'All Categories') {
      results = results.filter(r => r.category === selectedCategory);
    }

    if (selectedYear !== 'All Years') {
      results = results.filter(r => new Date(r.date_published).getFullYear().toString() === selectedYear);
    }

    results = [...results].sort((a, b) => {
      const dateA = new Date(a.date_published).getTime();
      const dateB = new Date(b.date_published).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return results;
  }, [resources, query, selectedCategory, selectedYear, fuse, sortOrder]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [query, selectedCategory, selectedYear, sortOrder]);

  // Infinite Scroll Logic
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "100px", threshold: 0 };
    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    }
  }, [handleObserver, filteredResources]);

  const visibleResources = filteredResources.slice(0, visibleCount);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('All Categories');
    setSelectedYear('All Years');
    setSortOrder('newest');
  };

  const hasActiveFilters = query !== '' || selectedCategory !== 'All Categories' || selectedYear !== 'All Years';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-academic-50 text-academic-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
             <i className="fa-solid fa-book-open"></i>
             <span>Resource hub</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            The CytoData <span className="text-academic-600">corpus</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-medium">
            Search through  publications, software releases, and biological breakthroughs in Image-based profiling.
          </p>
        </div>

        {/* Search & Control Cluster */}
        <div className="sticky top-20 z-40 mb-12">
           <div className="bg-white/90 backdrop-blur-2xl border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-[2rem] overflow-hidden transition-all">
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                 
                 {/* Top Control Bar: Search & View */}
                 <div className="flex flex-col lg:flex-row gap-6 items-center">
                    <div className="relative w-full lg:flex-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <i className="fa-solid fa-search text-slate-400"></i>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-14 pr-6 py-5 border-2 border-slate-50 rounded-2xl bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-academic-100 focus:border-academic-500 transition-all font-bold text-slate-900"
                        placeholder="Search corpus (DOI, title, author, journal)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search research corpus"
                      />
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                       <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
                          <button 
                              onClick={() => setViewMode('list')}
                              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === 'list' ? 'bg-white text-academic-600 shadow-lg shadow-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
                              aria-label="List view"
                          >
                              <i className="fa-solid fa-bars-staggered"></i>
                              <span>List</span>
                          </button>
                          <button 
                              onClick={() => setViewMode('grid')}
                              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === 'grid' ? 'bg-white text-academic-600 shadow-lg shadow-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
                              aria-label="Grid view"
                          >
                              <i className="fa-solid fa-grid-2"></i>
                              <span>Grid</span>
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Filters Row */}
                 <div className="flex flex-wrap gap-4 items-center border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">
                       <i className="fa-solid fa-filter"></i>
                       <span>Refine results:</span>
                    </div>

                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none px-5 py-3 border-2 border-slate-50 rounded-xl bg-slate-50 text-slate-700 text-sm font-black focus:border-academic-500 cursor-pointer hover:bg-white transition-all shadow-sm"
                      aria-label="Filter by category"
                    >
                      {allCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="appearance-none px-5 py-3 border-2 border-slate-50 rounded-xl bg-slate-50 text-slate-700 text-sm font-black focus:border-academic-500 cursor-pointer hover:bg-white transition-all shadow-sm"
                      aria-label="Filter by year"
                    >
                       {availableYears.map(year => (
                         <option key={year} value={year}>{year}</option>
                       ))}
                    </select>

                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                      className="appearance-none px-5 py-3 border-2 border-slate-50 rounded-xl bg-slate-50 text-slate-700 text-sm font-black focus:border-academic-500 cursor-pointer hover:bg-white transition-all shadow-sm"
                      aria-label="Sort order"
                    >
                      <option value="newest">Latest first</option>
                      <option value="oldest">Oldest first</option>
                    </select>

                    {hasActiveFilters && (
                        <button 
                           onClick={clearFilters}
                           className="px-5 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-black hover:bg-red-100 transition-all hover:scale-105 active:scale-95"
                        >
                           Reset all
                        </button>
                    )}
                 </div>
              </div>

              {/* Status Footer */}
              <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span className="text-slate-900">{filteredResources.length}</span> publications catalogued
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Displaying <span className="text-slate-900">{visibleResources.length}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Results Stream */}
        <h2 className="sr-only">Search results</h2>
        <div className={`
            ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}
        `}>
          {visibleResources.map((resource) => (
            <div key={resource.id} className="animate-page-enter">
              <ResourceCard resource={resource} viewMode={viewMode} />
            </div>
          ))}
        </div>

        {/* Infinite Load Indicator */}
        {visibleResources.length < filteredResources.length && (
           <div ref={loadMoreRef} className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="flex gap-1">
                 <div className="w-2 h-2 bg-academic-600 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-academic-600 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                 <div className="w-2 h-2 bg-academic-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Cataloguing more research</span>
           </div>
        )}

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border-4 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200/50">
              <i className="fa-solid fa-microscope text-4xl text-slate-200"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No matching papers</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
              We couldn't find any resources matching your search criteria. Try broadening your keywords or filters.
            </p>
            <button 
                onClick={clearFilters}
                className="px-8 py-3 bg-academic-600 text-white rounded-xl font-bold shadow-lg hover:bg-academic-700 transition-all hover:scale-105 active:scale-95"
            >
                Clear all filters
            </button>
          </div>
        )}
    </div>
  );
};