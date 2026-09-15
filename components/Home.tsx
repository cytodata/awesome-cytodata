import React from 'react';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section with Conceptual Background */}
      <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200">
        {/* Conceptual Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
          {/* Stylized Data Transformation Overlay */}
          <div className="absolute inset-0 flex items-center justify-around opacity-20">
             <div className="w-64 h-64 rounded-full border-4 border-academic-500 blur-xl animate-pulse"></div>
             <div className="w-96 h-96 rounded-3xl border-4 border-academic-600 blur-2xl animate-pulse [animation-delay:1s]"></div>
             <div className="w-80 h-80 rotate-45 border-4 border-academic-400 blur-xl animate-pulse [animation-delay:2s]"></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 sm:pt-32 sm:pb-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-academic-50 text-academic-700 rounded-full text-sm font-bold uppercase tracking-widest mb-8 animate-fade-in shadow-sm border border-academic-100">
             <i className="fa-solid fa-bolt-lightning"></i>
             <span>The Premier Resource Hub</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Advancing <span className="text-academic-600">image-based profiling</span> <br className="hidden sm:block"/>
            through open research
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            The central repository for the latest research, datasets, and software in morphological profiling. 
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onNavigate('resources')}
              className="px-10 py-5 bg-academic-600 text-white rounded-2xl font-black shadow-2xl shadow-academic-200 hover:bg-academic-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              aria-label="Explore Research Resources"
            >
              <i className="fa-solid fa-book-open-reader text-xl"></i>
              Explore Research
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black shadow-xl shadow-slate-100 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              aria-label="Learn about our mission"
            >
              Learn Our Mission
            </button>
          </div>
        </div>
      </div>

      {/* Overview Section - What we provide */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-academic-100 transition-all group">
            <div className="w-14 h-14 bg-academic-50 rounded-2xl flex items-center justify-center text-academic-600 mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-file-invoice text-2xl"></i>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">Latest research</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              A curated feed of the most recent publications in the field, from foundational methods to novel biological applications.
            </p>
            <button onClick={() => onNavigate('resources')} className="text-academic-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Browse Papers <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-academic-100 transition-all group">
            <div className="w-14 h-14 bg-academic-50 rounded-2xl flex items-center justify-center text-academic-600 mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-database text-2xl"></i>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">Massive datasets</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Publicly available high-content public datasets that serve as the benchmarks for morphological profiling and machine learning models.
            </p>
            <button onClick={() => onNavigate('datasets')} className="text-academic-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Explore Data <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-academic-100 transition-all group">
            <div className="w-14 h-14 bg-academic-50 rounded-2xl flex items-center justify-center text-academic-600 mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-code text-2xl"></i>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-3">Open software</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Computational tools and pipelines used by the community to transform raw microscopy images into quantitative biological insights.
            </p>
            <button onClick={() => onNavigate('software')} className="text-academic-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              View Tools <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mission / Community Section */}
      <div className="max-w-6xl mx-auto px-4 mb-24">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-academic-600/10 blur-[120px] pointer-events-none"></div>
          <div className="p-10 sm:p-20 relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 leading-tight">
                Our goal: A unified hub for the <br/>
                <span className="text-academic-600">profiling community</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Awesome CytoData was developed to centralize the rapidly expanding knowledge base of image-based profiling. We provide a structured overview of the field's progress, ensuring that researchers, from computational biologists to microscopy experts, have immediate access to the latest breakthroughs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};