
import React from 'react';
import logo from '../media/cytodata-logo.png';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const linkClass = (view: string) => `
    cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${currentView === view 
      ? 'text-academic-800 bg-academic-50' 
      : 'text-slate-600 hover:text-academic-600 hover:bg-slate-50'}
  `;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img 
              src={logo} 
              alt="CytoData Logo" 
              className="w-14 h-14 object-contain"
            />
            <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
              Awesome <span className="text-academic-600">CytoData</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
             <a onClick={() => onNavigate('home')} className={linkClass('home')}>
                Home
             </a>
             <a onClick={() => onNavigate('datasets')} className={linkClass('datasets')}>
                Datasets
             </a>
             <a onClick={() => onNavigate('software')} className={linkClass('software')}>
                Software
             </a>
             <a onClick={() => onNavigate('resources')} className={linkClass('resources')}>
                Literature
             </a>
             <a onClick={() => onNavigate('about')} className={linkClass('about')}>
                About
             </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/cytodata/awesome-cytodata/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-black transition-colors"
            >
              <i className="fa-brands fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
