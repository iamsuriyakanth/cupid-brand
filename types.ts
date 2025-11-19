export interface UserInput {
  name: string;
  age: string;
  gender: string;
  profession: string;
  hobbies: string;
  vibe: string;
  targetPartner: string;
  tone: 'bold' | 'funny' | 'flirty' | 'serious' | 'classy' | 'adventurous';
  images: string[]; // Base64 strings
}

export interface BioVariations {
  short: string;
  medium: string;
  long: string;
  tinder: string;
  bumble: string;
  hinge: string;
  okcupid: string;
}

export interface BrandIdentity {
  archetype: string;
  tagline: string;
  emotionalVibe: string;
  writingStyle: string;
  colorPaletteSuggestions: string[];
}

export interface PhotoAdvice {
  analysis: string;
  keep: string[];
  discard: string[];
  newIdeas: string[];
}

export interface ProfileOptimization {
  prompts: { question: string; answer: string }[];
  openers: string[];
  donts: string[];
}

export interface DatingProfileResult {
  brandIdentity: BrandIdentity;
  bios: BioVariations;
  photoAdvice: PhotoAdvice;
  optimization: ProfileOptimization;
}

export enum AppState {
  INTRO = 'INTRO',
  INTERVIEW = 'INTERVIEW',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}