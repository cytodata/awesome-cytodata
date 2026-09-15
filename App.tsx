import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { ResourceFeed } from './components/ResourceFeed';
import { Datasets } from './components/Datasets';
import { SoftwareTools } from './components/Software';
import { About } from './components/About';
import { Resource, Dataset, Software } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [resources, setResources] = useState<Resource[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [software, setSoftware] = useState<Software[]>([]);

  // Load data via fetch
  useEffect(() => {
    // Fetch Resources
    fetch('data/papers.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => setResources(data as Resource[]))
      .catch(e => console.error('Error loading resources', e));

    // Fetch Datasets
    fetch('data/datasets.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => setDatasets(data as Dataset[]))
      .catch(e => console.error('Error loading datasets', e));

    // Fetch Software
    fetch('data/software.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => setSoftware(data as Software[]))
      .catch(e => console.error('Error loading software', e));
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'resources':
        return <ResourceFeed resources={resources} />;
      case 'datasets':
        return <Datasets datasets={datasets} />;
      case 'software':
        return <SoftwareTools tools={software} />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* 
        The key={currentView} prop is crucial here. 
        It tells React to treat the div as a new element when currentView changes,
        which triggers the CSS animation defined in index.html.
      */}
      <main className="flex-grow">
        <div key={currentView} className="animate-page-enter">
          {renderView()}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">
            Awesome CytoData &bull; Built for the Open Science Community.
          </p>
          <div className="text-sm">
            <a href="https://github.com/yourusername/awesome-profiling" className="hover:text-white underline">
              Contribute on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;