import React, { useState, useRef, useEffect } from 'react';
import { DatingProfileResult } from '../types';
import { Copy, Check, Sparkles, Palette, Camera, MessageCircle, X } from 'lucide-react';

interface Props {
  data: DatingProfileResult;
  onRestart: () => void;
}

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col md:flex-row items-center justify-center md:space-x-2 py-2 md:py-2 md:px-4 flex-1 md:flex-none text-[10px] md:text-sm font-medium transition-all rounded-lg md:rounded-full ${
      active 
        ? 'text-rose-600 md:bg-rose-100 md:text-rose-700' 
        : 'text-slate-400 md:text-slate-600 hover:text-slate-600 md:hover:bg-slate-100'
    }`}
  >
    <Icon className={`w-6 h-6 md:w-4 md:h-4 mb-1 md:mb-0 ${active ? "stroke-[2.5px]" : "stroke-2"}`} />
    <span>{label}</span>
  </button>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 bg-white/50 hover:bg-white text-slate-400 hover:text-rose-500 transition-all rounded-full backdrop-blur-sm"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

export const Results: React.FC<Props> = ({ data, onRestart }) => {
  const [activeTab, setActiveTab] = useState<'brand' | 'bios' | 'photos' | 'prompts'>('brand');
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when tab changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Header - Decongested */}
      <header className="shrink-0 bg-white border-b border-slate-200 hidden md:block z-20 relative shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2 w-48">
            <div className="bg-rose-50 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-rose-500" />
            </div>
            <h1 className="text-lg font-serif font-bold text-slate-900">CupidBrand</h1>
          </div>

          {/* Navigation - Centered Pills */}
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-1 bg-slate-50 p-1 rounded-full border border-slate-100">
                <TabButton 
                active={activeTab === 'brand'} 
                onClick={() => setActiveTab('brand')} 
                icon={Palette} 
                label="Identity" 
                />
                <TabButton 
                active={activeTab === 'bios'} 
                onClick={() => setActiveTab('bios')} 
                icon={MessageCircle} 
                label="Bios" 
                />
                <TabButton 
                active={activeTab === 'photos'} 
                onClick={() => setActiveTab('photos')} 
                icon={Camera} 
                label="Photos" 
                />
                <TabButton 
                active={activeTab === 'prompts'} 
                onClick={() => setActiveTab('prompts')} 
                icon={Sparkles} 
                label="Prompts" 
                />
            </div>
          </div>

          {/* Action Section */}
          <div className="w-48 flex justify-end">
             <button 
              onClick={onRestart}
              className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors px-3 py-1.5 hover:bg-rose-50 rounded-md"
            >
              Start Over
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header - Simple Title Only */}
      <header className="shrink-0 bg-white border-b border-slate-200 md:hidden px-4 h-14 flex justify-between items-center z-20">
         <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h1 className="text-lg font-serif font-bold text-slate-900">CupidBrand</h1>
          </div>
          <button 
            onClick={onRestart}
            className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-full text-slate-600 active:bg-slate-200"
          >
            Restart
          </button>
      </header>

      {/* Main Content Area - Scrollable with ref for auto-scroll */}
      <main 
        ref={mainContentRef}
        className="flex-1 overflow-y-auto scroll-smooth bg-slate-50"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-12">
          
          {/* Brand Identity Tab */}
          {activeTab === 'brand' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 md:p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400"></div>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold tracking-wider uppercase mb-4 border border-rose-100">
                  Your Archetype
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-3">{data.brandIdentity.archetype}</h2>
                <p className="text-lg md:text-xl text-slate-500 italic font-light">"{data.brandIdentity.tagline}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center text-lg">
                    <span className="bg-yellow-100 p-1.5 rounded-md mr-3 text-yellow-600">✨</span> Emotional Vibe
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{data.brandIdentity.emotionalVibe}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center text-lg">
                    <span className="bg-blue-100 p-1.5 rounded-md mr-3 text-blue-600">✍️</span> Writing Style
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{data.brandIdentity.writingStyle}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Aesthetic Palette</h3>
                <div className="flex flex-wrap gap-3">
                  {data.brandIdentity.colorPaletteSuggestions.map((color, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 shadow-sm border border-white" style={{ backgroundColor: 'currentColor' }}></div>
                      <span className="text-slate-700 font-medium text-sm">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bios Tab */}
          {activeTab === 'bios' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative group">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">The "One-Liner"</h3>
                <p className="text-lg text-slate-800 font-medium pr-8">{data.bios.short}</p>
                <CopyButton text={data.bios.short} />
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative group">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">The "Elevator Pitch"</h3>
                <p className="text-lg text-slate-800 font-medium pr-8">{data.bios.medium}</p>
                <CopyButton text={data.bios.medium} />
              </div>
              <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-sm border border-rose-100 p-6 md:p-8 relative group">
                <h3 className="text-xs font-bold text-rose-500 uppercase tracking-wide mb-3">The Full Personality</h3>
                <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-line pr-8">{data.bios.long}</p>
                <CopyButton text={data.bios.long} />
              </div>

              <div className="col-span-1 md:col-span-2 mt-4">
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 px-1">App Specific Versions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="bg-white p-5 rounded-2xl border border-slate-200 relative shadow-sm">
                     <span className="text-[10px] font-bold bg-pink-500 text-white px-2 py-1 rounded mb-3 inline-block tracking-wide">TINDER</span>
                     <p className="text-slate-700">{data.bios.tinder}</p>
                     <CopyButton text={data.bios.tinder} />
                   </div>
                   <div className="bg-white p-5 rounded-2xl border border-slate-200 relative shadow-sm">
                     <span className="text-[10px] font-bold bg-yellow-400 text-slate-900 px-2 py-1 rounded mb-3 inline-block tracking-wide">BUMBLE</span>
                     <p className="text-slate-700">{data.bios.bumble}</p>
                     <CopyButton text={data.bios.bumble} />
                   </div>
                   <div className="bg-white p-5 rounded-2xl border border-slate-200 relative shadow-sm">
                     <span className="text-[10px] font-bold bg-slate-800 text-white px-2 py-1 rounded mb-3 inline-block tracking-wide">HINGE</span>
                     <p className="text-slate-700">{data.bios.hinge}</p>
                     <CopyButton text={data.bios.hinge} />
                   </div>
                   <div className="bg-white p-5 rounded-2xl border border-slate-200 relative shadow-sm">
                     <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-1 rounded mb-3 inline-block tracking-wide">OKCUPID</span>
                     <p className="text-slate-700">{data.bios.okcupid}</p>
                     <CopyButton text={data.bios.okcupid} />
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Photo Strategy Tab */}
          {activeTab === 'photos' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-rose-500 rounded-full opacity-20 blur-2xl"></div>
                <h3 className="text-xl font-bold mb-4 flex items-center relative z-10">
                  <Camera className="w-6 h-6 mr-3 text-rose-400" />
                  AI Audit Result
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed relative z-10">{data.photoAdvice.analysis}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-green-700 font-bold mb-3 flex items-center">
                     <div className="bg-green-100 p-1 rounded-full mr-2"><Check className="w-3 h-3" /></div> 
                     Keep
                  </h4>
                  <ul className="space-y-3">
                    {data.photoAdvice.keep.map((item, i) => (
                      <li key={i} className="text-slate-700 text-sm flex items-start">
                        <span className="mr-2 text-green-500">•</span> {item}
                      </li>
                    ))}
                    {data.photoAdvice.keep.length === 0 && <li className="text-slate-400 text-sm italic">No specific photos to keep identified.</li>}
                  </ul>
                </div>

                <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-red-700 font-bold mb-3 flex items-center">
                     <div className="bg-red-100 p-1 rounded-full mr-2"><X className="w-3 h-3" /></div>
                     Discard
                  </h4>
                  <ul className="space-y-3">
                    {data.photoAdvice.discard.map((item, i) => (
                      <li key={i} className="text-slate-700 text-sm flex items-start">
                        <span className="mr-2 text-red-500">•</span> {item}
                      </li>
                    ))}
                     {data.photoAdvice.discard.length === 0 && <li className="text-slate-400 text-sm italic">Great job! No photos flagged for removal.</li>}
                  </ul>
                </div>

                <div className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-indigo-700 font-bold mb-3 flex items-center">
                     <div className="bg-indigo-100 p-1 rounded-full mr-2"><Sparkles className="w-3 h-3" /></div>
                     New Ideas
                  </h4>
                  <ul className="space-y-3">
                    {data.photoAdvice.newIdeas.map((item, i) => (
                      <li key={i} className="text-slate-700 text-sm flex items-start">
                        <span className="mr-2 text-indigo-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Prompts Tab */}
          {activeTab === 'prompts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 px-1">Hinge/Bumble Prompts</h3>
                <div className="space-y-4">
                  {data.optimization.prompts.map((prompt, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Prompt</p>
                      <p className="font-medium text-slate-900 mb-4">{prompt.question}</p>
                      <div className="bg-rose-50 rounded-xl p-4 relative border border-rose-100">
                        <p className="text-rose-900 italic text-sm pr-6">"{prompt.answer}"</p>
                        <CopyButton text={prompt.answer} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                 <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 px-1">Winning Openers</h3>
                  <ul className="space-y-3">
                    {data.optimization.openers.map((opener, i) => (
                      <li key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start group hover:border-rose-200 transition-colors">
                        <span className="text-rose-500 mr-3 font-serif font-bold text-xl leading-none mt-1">“</span>
                        <p className="text-slate-700 flex-1 text-sm md:text-base">{opener}</p>
                        <button 
                          onClick={() => navigator.clipboard.writeText(opener)}
                          className="md:opacity-0 md:group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                 </div>

                 <div>
                   <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 px-1">Red Flags to Avoid</h3>
                   <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {data.optimization.donts.map((item, i) => (
                          <li key={i} className="flex items-start text-red-900 text-sm">
                            <X className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-red-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Fixed */}
      <nav className="shrink-0 bg-white border-t border-slate-200 md:hidden pb-safe z-50">
        <div className="flex justify-around items-center">
          <TabButton 
            active={activeTab === 'brand'} 
            onClick={() => setActiveTab('brand')} 
            icon={Palette} 
            label="Brand" 
          />
          <TabButton 
            active={activeTab === 'bios'} 
            onClick={() => setActiveTab('bios')} 
            icon={MessageCircle} 
            label="Bios" 
          />
          <TabButton 
            active={activeTab === 'photos'} 
            onClick={() => setActiveTab('photos')} 
            icon={Camera} 
            label="Photos" 
          />
          <TabButton 
            active={activeTab === 'prompts'} 
            onClick={() => setActiveTab('prompts')} 
            icon={Sparkles} 
            label="Prompts" 
          />
        </div>
      </nav>
    </div>
  );
};