import React from 'react';
import logo from '../media/cytodata-logo.png';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-academic-50 text-academic-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
           <i className="fa-solid fa-circle-info"></i>
           <span>Our mission</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-8 tracking-tight">About the <span className="text-academic-600">community</span></h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
          A global collective of researchers, computational biologists, and data scientists dedicated to the systematic quantification of cell phenotypes.
        </p>
      </div>

      <div className="space-y-24">
        {/* Mission Section */}
        <section>
          <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 sm:p-16 flex flex-col md:flex-row gap-12 items-center">
             <div className="flex-1">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Our perspective</h2>
                <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                  We are a community-based collective of scientists dedicated to tracking the evolving field of image-based profiling. We believe that progress in science is driven by shared standards, open dialogue, and a rigorous examination of the visual patterns of life.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Our objective is to serve as a central hub for knowledge exchange. We find the latest state-of-the-art methods across diverse labs and institutions and present them to the community, giving researchers a single place to see what is happening in the field.
                </p>
             </div>
             <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative">
                  <img 
                      src={logo} 
                      alt="CytoData Logo" 
                      className="w-56 h-56 object-contain relative z-10 drop-shadow-2xl"
                  />
                </div>
             </div>
          </div>
        </section>

        {/* Awesome CytoData Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Contribution to science</h2>
              <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Scientific discovery relies on the availability and discoverability of high-quality outputs. In a field as data-intensive as morphological profiling, organizing these artifacts is critical for reproducibility.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                <strong className="text-slate-900">Awesome CytoData</strong> is our community contribution to the global scientific record. We focus on curating three primary pillars of the field:
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-academic-50 rounded-xl flex items-center justify-center text-academic-600">
                    <i className="fa-solid fa-file-lines"></i>
                  </div>
                  <span className="font-bold text-slate-800">Research papers</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-academic-50 rounded-xl flex items-center justify-center text-academic-600">
                    <i className="fa-solid fa-code"></i>
                  </div>
                  <span className="font-bold text-slate-800">Open software</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-academic-50 rounded-xl flex items-center justify-center text-academic-600">
                    <i className="fa-solid fa-database"></i>
                  </div>
                  <span className="font-bold text-slate-800">Public datasets</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-10 sm:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-academic-600/5 pointer-events-none"></div>
                <h3 className="text-xl font-black mb-8 text-academic-400 uppercase tracking-widest">Core objectives</h3>
                <ul className="space-y-6">
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-academic-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <i className="fa-solid fa-check text-white text-[10px]"></i>
                        </div>
                        <span className="text-slate-300 text-lg">Providing a curated index of papers, software, and data</span>
                    </li>
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-academic-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <i className="fa-solid fa-check text-white text-[10px]"></i>
                        </div>
                        <span className="text-slate-300 text-lg">Lowering the barrier to entry for image-based research</span>
                    </li>
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-academic-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <i className="fa-solid fa-check text-white text-[10px]"></i>
                        </div>
                        <span className="text-slate-300 text-lg">Encouraging the reuse of high-value open data</span>
                    </li>
                </ul>
            </div>
        </section>

        {/* Join Section */}
        <section className="bg-academic-600 rounded-[3rem] p-12 sm:p-20 text-center text-white shadow-2xl shadow-academic-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Connect with the community</h2>
            <p className="text-academic-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Our community is open to all who are interested in the science of cell morphology. Join us in studying the visual patterns of life.
            </p>
            <div className="mb-16">
              <a 
                  href="https://www.cytodata.org/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center px-10 py-5 bg-white text-academic-600 rounded-2xl font-black hover:bg-academic-50 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                  Visit CytoData.org
                  <i className="fa-solid fa-arrow-right ml-3"></i>
              </a>
            </div>

            <div className="border-t border-academic-500/50 pt-12">
              <p className="text-academic-200 font-black mb-8 uppercase tracking-[0.2em] text-xs">Stay Updated</p>
              <div className="flex justify-center items-center gap-8">
                  <a 
                      href="https://www.linkedin.com/company/cytodata" 
                      target="_blank" 
                      rel="noreferrer"
                      className="group"
                      aria-label="LinkedIn"
                  >
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-academic-600 transition-all shadow-lg">
                          <i className="fa-brands fa-linkedin text-2xl"></i>
                      </div>
                  </a>
                  <a 
                      href="https://bsky.app/profile/cytodata.org" 
                      target="_blank" 
                      rel="noreferrer"
                      className="group"
                      aria-label="BlueSky"
                  >
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-academic-600 transition-all shadow-lg">
                          <svg viewBox="0 0 512 512" fill="currentColor" className="w-7 h-7">
                               <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.9-5.8-11.7-6.7-13.7 0l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C99.9 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z"/>
                          </svg>
                      </div>
                  </a>
                  <a 
                      href="https://twitter.com/cytodata" 
                      target="_blank" 
                      rel="noreferrer"
                      className="group"
                      aria-label="X (formerly Twitter)"
                  >
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-academic-600 transition-all shadow-lg">
                          <i className="fa-brands fa-x-twitter text-2xl"></i>
                      </div>
                  </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};