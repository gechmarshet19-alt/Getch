import React, { useState } from 'react';
import BannerPreview from './components/BannerPreview';
import ControlPanel from './components/ControlPanel';
import { BannerState, ProcessingMode } from './types';
import { removeTextFromImage, generateEthiopianFoodImage } from './services/geminiService';
import { UtensilsCrossed } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<BannerState>({
    businessName: 'ብርቴ ምግብ እና ቡና',
    title: 'የባህላዊ ኢትዮጵያ ምግብ እና ቡና',
    subtitle: 'ባህላዊ ጣዕም፣ እውነተኛ ጥራት',
    phone: '+2519-23-25-24',
    // Authentic Ethiopian Injera Platter Image
    imageUrl: 'https://images.unsplash.com/photo-1695663738096-74d6c442436f?q=80&w=1000&auto=format&fit=crop', 
    isProcessing: false,
    error: null,
  });

  const updateState = (updates: Partial<BannerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateState({ imageUrl: e.target.result as string, error: null });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async (mode: ProcessingMode) => {
    if (mode === ProcessingMode.NONE) return;

    updateState({ isProcessing: true, error: null });

    try {
      let newImageUrl = state.imageUrl;

      if (mode === ProcessingMode.CLEANING) {
        // Extract base64 data proper
        const base64Data = state.imageUrl.split(',')[1];
        const mimeType = state.imageUrl.split(';')[0].split(':')[1] || 'image/jpeg';
        
        if (!base64Data) {
            throw new Error("Invalid image source for cleaning.");
        }
        newImageUrl = await removeTextFromImage(base64Data, mimeType);
      } else if (mode === ProcessingMode.GENERATING) {
        newImageUrl = await generateEthiopianFoodImage();
      }

      updateState({ imageUrl: newImageUrl });
    } catch (err: any) {
      updateState({ error: err.message || "An error occurred while processing the image." });
    } finally {
      updateState({ isProcessing: false });
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-96 flex-shrink-0 h-auto md:h-screen p-4 border-b md:border-b-0 md:border-r border-stone-800">
        <div className="flex items-center gap-3 mb-6 px-2">
            <div className="p-2 bg-gradient-to-br from-green-700 to-green-900 rounded-lg text-white shadow-lg">
                <UtensilsCrossed size={24} />
            </div>
            <h1 className="text-xl font-bold font-amharic">EthioBanner <span className="text-yellow-500">Creator</span></h1>
        </div>
        <ControlPanel 
          state={state} 
          onUpdate={updateState} 
          onProcess={handleProcess}
          onFileUpload={handleFileUpload}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Toolbar / Header could go here */}
        <div className="h-16 border-b border-stone-800 flex items-center px-6 bg-stone-900/50 backdrop-blur">
            <span className="text-sm text-stone-400">Preview Mode</span>
            {state.error && (
                <span className="ml-auto text-red-400 text-sm bg-red-900/20 px-3 py-1 rounded border border-red-500/30">
                    Error: {state.error}
                </span>
            )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <BannerPreview state={state} />
        </div>
      </div>
    </div>
  );
};

export default App;