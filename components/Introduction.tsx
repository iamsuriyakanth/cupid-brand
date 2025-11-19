import React from 'react';
import { Heart, ArrowRight, Sparkles, Camera, Target } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const Introduction: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-gradient-to-br from-rose-50 to-slate-100 flex flex-col overflow-hidden font-sans">
      
      {/* Main Content Area - Centered & Flexible */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
        <div className="w-full max-w-md md:max-w-4xl space-y-6 md:space-y-12 text-center">
            
            {/* Hero Section */}
            <div className="space-y-3 md:space-y-6">
                <div className="flex justify-center">
                    <div className="bg-rose-100 p-3 md:p-4 rounded-full ring-4 ring-rose-50 shadow-xl relative group">
                        <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-500 fill-rose-500 relative z-10" />
                        <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-20 duration-1000"></div>
                    </div>
                </div>
                
                <div>
                    <h1 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight">
                    CupidBrand
                    </h1>
                    <h2 className="text-sm md:text-2xl text-slate-600 font-light italic mt-6 md:mt-8">
                    "Make Your Dating Profile Impossible to Ignore"
                    </h2>
                </div>
                
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed hidden md:block max-w-2xl mx-auto">
                Stop guessing what to write. We craft a consistent, attractive, and authentic dating profile tailored to your personality.
                </p>
            </div>

            {/* Features - Compact List for Mobile, Horizontal Grid for Web */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6 w-full text-left md:text-center">
              <div className="bg-white/70 backdrop-blur-md p-3 md:p-6 rounded-xl shadow-sm border border-rose-100 flex items-center md:flex-col md:justify-center gap-3 md:gap-4 transition-transform hover:scale-105 duration-300">
                <div className="bg-rose-100 p-1.5 md:p-3 rounded-lg md:rounded-2xl shrink-0">
                    <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-rose-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800 text-sm md:text-lg">Bio Rewrites</h3>
                    <p className="text-[10px] md:text-sm text-slate-500 leading-tight md:leading-normal md:mt-1">Witty, bold, or classy bios crafted to match your vibe.</p>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-md p-3 md:p-6 rounded-xl shadow-sm border border-rose-100 flex items-center md:flex-col md:justify-center gap-3 md:gap-4 transition-transform hover:scale-105 duration-300">
                <div className="bg-rose-100 p-1.5 md:p-3 rounded-lg md:rounded-2xl shrink-0">
                    <Camera className="w-4 h-4 md:w-6 md:h-6 text-rose-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800 text-sm md:text-lg">Photo Audit</h3>
                    <p className="text-[10px] md:text-sm text-slate-500 leading-tight md:leading-normal md:mt-1">Know which photos help or hurt your profile.</p>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-3 md:p-6 rounded-xl shadow-sm border border-rose-100 flex items-center md:flex-col md:justify-center gap-3 md:gap-4 transition-transform hover:scale-105 duration-300">
                <div className="bg-rose-100 p-1.5 md:p-3 rounded-lg md:rounded-2xl shrink-0">
                    <Target className="w-4 h-4 md:w-6 md:h-6 text-rose-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800 text-sm md:text-lg">Smart Targeting</h3>
                    <p className="text-[10px] md:text-sm text-slate-500 leading-tight md:leading-normal md:mt-1">Attract the type of person you genuinely want.</p>
                </div>
              </div>
            </div>

        </div>
      </div>

      {/* Bottom CTA - Fixed in flow but visually anchored */}
      <div className="shrink-0 p-6 pb-8 md:pb-12 w-full flex justify-center z-20">
        <div className="w-full max-w-sm md:max-w-xs text-center space-y-8 md:space-y-14">
            <button 
            onClick={onStart}
            className="w-full group relative flex items-center justify-center px-8 py-3.5 md:py-4 text-lg font-medium text-white transition-all duration-200 bg-rose-500 rounded-xl md:rounded-full hover:bg-rose-600 active:scale-[0.98] shadow-lg shadow-rose-200 ring-offset-2 focus:ring-2 focus:ring-rose-500"
            >
            Build My Brand
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-slate-400 font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity cursor-default">
              Built with ❤️ by Suriyakanth R
            </p>
        </div>
      </div>

    </div>
  );
};