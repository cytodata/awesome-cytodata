import React from 'react';
import { Resource, Category } from '../types';
import { ResourceCard } from './ResourceCard';

interface InfluentialPapersProps {
  resources: Resource[];
  onNavigate: (view: string) => void;
}

export const InfluentialPapers: React.FC<InfluentialPapersProps> = ({ resources, onNavigate }) => {
  const influentialResources = resources.filter(r => r.category === Category.INFLUENTIAL);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-500 mb-4">
            <i className="fa-solid fa-crown text-3xl"></i>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Influential Papers</h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600">
          New to the field? These are the foundational texts and surveys that defined 
          modern image-based profiling.
        </p>
      </div>

      <h2 className="sr-only">Influential papers list</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {influentialResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      <div className="mt-16 text-center">
         <p className="text-slate-500 mb-4">Ready to explore more?</p>
         <button 
            onClick={() => onNavigate('resources')}
            className="text-academic-600 font-semibold hover:text-academic-800 underline"
          >
            Browse the full collection &rarr;
          </button>
      </div>
    </div>
  );
};