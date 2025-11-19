import React, { useState, ChangeEvent } from 'react';
import { UserInput } from '../types';
import { Camera, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (data: UserInput) => void;
}

const STEPS = [
  'Basics',
  'Personality',
  'Goals',
  'Photos'
];

const TONE_OPTIONS = [
  { id: 'bold', label: 'Bold', emoji: '🦁', desc: 'Confident & direct' },
  { id: 'funny', label: 'Funny', emoji: '😂', desc: 'Witty & humorous' },
  { id: 'flirty', label: 'Flirty', emoji: '😉', desc: 'Playful & charming' },
  { id: 'serious', label: 'Serious', emoji: '🧐', desc: 'Intentional & deep' },
  { id: 'classy', label: 'Classy', emoji: '🥂', desc: 'Elegant & refined' },
  { id: 'adventurous', label: 'Adventurous', emoji: '🧗', desc: 'Spontaneous & fun' },
];

export const Interview: React.FC<Props> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [formData, setFormData] = useState<UserInput>({
    name: '',
    age: '',
    gender: '',
    profession: '',
    hobbies: '',
    vibe: '',
    targetPartner: '',
    tone: '' as any, // Start empty, force user to select
    images: []
  });

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onSubmit(formData);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (field: keyof UserInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsProcessingImages(true);
      try {
        const files = Array.from(e.target.files) as File[];
        const currentCount = formData.images.length;
        const remainingSlots = 3 - currentCount;

        if (remainingSlots <= 0) {
          alert("You have already selected 3 photos.");
          return;
        }

        const filesToProcess = files.slice(0, remainingSlots);
        if (files.length > remainingSlots) {
          alert(`Only the first ${remainingSlots} photo(s) were added. Maximum 3 allowed.`);
        }

        const readPromises = filesToProcess.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) {
                resolve(reader.result as string);
              }
            };
            reader.readAsDataURL(file);
          });
        });

        const newImages = await Promise.all(readPromises);
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
      } catch (error) {
        console.error("Error processing images", error);
      } finally {
        setIsProcessingImages(false);
        // Reset file input
        e.target.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Validation for "Next" button
  const isNextDisabled = isProcessingImages || (step === 2 && !formData.tone);

  return (
    <div className="fixed inset-0 z-50 bg-white md:static md:min-h-screen md:bg-slate-50 md:flex md:items-center md:justify-center md:p-6">
      <div className="flex flex-col w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-2xl md:shadow-xl md:border md:border-slate-100 bg-white overflow-hidden font-sans">
        
        {/* Fixed Header: Progress Bar & Title */}
        <div className="shrink-0 bg-white z-10">
          <div className="bg-slate-100 h-1.5 w-full">
            <div 
              className="bg-rose-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="p-6 border-b border-slate-50">
            <h2 className="text-2xl font-bold text-slate-800 font-serif mb-1">
              {step === 0 && "The Basics"}
              {step === 1 && "Your Story"}
              {step === 2 && "The Goal"}
              {step === 3 && "Photo Check"}
            </h2>
            <p className="text-slate-500 text-sm">
              {step === 0 && "Let's start with the essentials."}
              {step === 1 && "What makes you, you?"}
              {step === 2 && "Who are you looking for?"}
              {step === 3 && "Upload up to 3 photos for AI analysis."}
            </p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-lg mx-auto space-y-6">
            
            {/* Step 0: Basics */}
            {step === 0 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-900 bg-white"
                    placeholder="e.g., Alex"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                    <input 
                      type="number" 
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-900 bg-white"
                      placeholder="28"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                    <input 
                      type="text" 
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-900 bg-white"
                      placeholder="e.g., Male"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Profession</label>
                  <input 
                    type="text" 
                    value={formData.profession}
                    onChange={(e) => handleChange('profession', e.target.value)}
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-900 bg-white"
                    placeholder="e.g., Graphic Designer"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Personality */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Hobbies & Interests</label>
                  <textarea 
                    value={formData.hobbies}
                    onChange={(e) => handleChange('hobbies', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none h-40 text-slate-900 bg-white resize-none leading-relaxed"
                    placeholder="e.g., Hiking on weekends, hunting for the best indie coffee shops, sci-fi novels, film photography..."
                  />
                </div>
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Current Vibe</label>
                  <input 
                    type="text" 
                    value={formData.vibe}
                    onChange={(e) => handleChange('vibe', e.target.value)}
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-900 bg-white"
                    placeholder="e.g., Chill but ambitious, artistic chaos..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Partner</label>
                  <textarea 
                    value={formData.targetPartner}
                    onChange={(e) => handleChange('targetPartner', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none h-32 text-slate-900 bg-white resize-none leading-relaxed"
                    placeholder="Describe who you want to attract. e.g., Someone kind, emotionally intelligent, adventurous..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Tone</label>
                  <div className="grid grid-cols-2 gap-3">
                    {TONE_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleChange('tone', t.id)}
                        className={`group relative flex flex-col items-start p-4 rounded-2xl transition-all border text-left ${
                          formData.tone === t.id
                            ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-500'
                            : 'bg-white border-slate-200 hover:border-rose-200 hover:shadow-sm'
                        }`}
                      >
                        <span className="text-2xl mb-1">{t.emoji}</span>
                        <span className={`font-semibold text-sm ${formData.tone === t.id ? 'text-rose-700' : 'text-slate-800'}`}>
                          {t.label}
                        </span>
                        <span className={`text-xs mt-0.5 ${formData.tone === t.id ? 'text-rose-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                          {t.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                {formData.images.length < 3 ? (
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors relative group ${isProcessingImages ? 'bg-slate-100 border-slate-300 cursor-wait' : 'border-rose-200 hover:bg-rose-50 bg-slate-50/50'}`}>
                    {!isProcessingImages && (
                        <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={isProcessingImages}
                        />
                    )}
                    
                    {isProcessingImages ? (
                        <div className="flex flex-col items-center justify-center">
                            <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-2" />
                            <p className="text-slate-500 text-sm font-medium">Processing images...</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 text-rose-500 group-hover:scale-110 transition-transform">
                            <Camera className="w-7 h-7" />
                            </div>
                            <p className="text-slate-800 font-semibold text-lg">Tap to upload</p>
                            <p className="text-sm text-slate-500 mt-1">
                              {formData.images.length === 0 
                                ? "Upload up to 3 photos" 
                                : `${3 - formData.images.length} slot${3 - formData.images.length !== 1 ? 's' : ''} remaining`
                              }
                            </p>
                        </>
                    )}
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-emerald-700 text-sm font-medium">Maximum photos selected</p>
                  </div>
                )}

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group border border-slate-100">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        <button 
                          onClick={() => removeImage(idx)}
                          className="absolute top-1.5 right-1.5 bg-white/90 text-slate-700 p-1.5 rounded-full shadow-sm hover:text-red-500 transition-colors backdrop-blur-sm z-20"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>Tip:</strong> Upload photos you actually plan to use. Our AI will critique lighting, expression, and vibe consistency.
                  </p>
                </div>
              </div>
            )}

            {/* Spacer to ensure content isn't hidden behind fixed footer on small screens if needed, 
                though flex layout handles most cases. */}
            <div className="h-6 md:h-0"></div>
          </div>
        </div>
        
        {/* Fixed Footer */}
        <div className="shrink-0 p-4 md:p-6 border-t border-slate-100 bg-white safe-area-bottom">
            <div className="flex justify-between items-center max-w-lg mx-auto w-full">
            <button 
              onClick={handleBack}
              disabled={step === 0}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                step === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`flex items-center px-8 py-3 rounded-xl text-base font-medium shadow-lg shadow-slate-200 transition-all transform active:scale-95 ${
                  isNextDisabled
                  ? 'bg-slate-300 text-white cursor-not-allowed' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {step === STEPS.length - 1 ? 'Analyze Profile' : 'Next'}
              {step !== STEPS.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};