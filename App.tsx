import { useState } from 'react';
import { Introduction } from './components/Introduction';
import { Interview } from './components/Interview';
import { Results } from './components/Results';
import { AppState, UserInput, DatingProfileResult } from './types';
import { generateDatingProfile } from './services/gemini';
import { Heart } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [results, setResults] = useState<DatingProfileResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setAppState(AppState.INTERVIEW);
  };

  const handleFormSubmit = async (data: UserInput) => {
    setAppState(AppState.LOADING);
    try {
      const profile = await generateDatingProfile(data);
      setResults(profile);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleRestart = () => {
    setResults(null);
    setError(null);
    setAppState(AppState.INTRO);
  };

  if (appState === AppState.LOADING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-white p-6 rounded-full shadow-xl">
            <Heart className="w-12 h-12 text-rose-500 animate-pulse" />
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-serif font-bold text-slate-800 text-center">Crafting your romantic brand...</h2>
        <p className="mt-2 text-slate-500 text-center max-w-md">
          Analyzing your vibe, reviewing photos, and writing witty bios. 
          This might take a moment.
        </p>
      </div>
    );
  }

  if (appState === AppState.ERROR) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <Heart className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
        <p className="text-slate-600 mb-6 max-w-md">
          {error || "We couldn't generate your profile. Please check your internet connection or try again later."}
        </p>
        <button 
          onClick={() => setAppState(AppState.INTERVIEW)}
          className="bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {appState === AppState.INTRO && <Introduction onStart={handleStart} />}
      {appState === AppState.INTERVIEW && <Interview onSubmit={handleFormSubmit} />}
      {appState === AppState.RESULTS && results && <Results data={results} onRestart={handleRestart} />}
    </>
  );
}