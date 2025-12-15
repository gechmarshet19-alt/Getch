import React, { useRef } from 'react';
import { Download, Upload, Wand2, RefreshCw, Eraser } from 'lucide-react';
import { BannerState, ProcessingMode } from '../types';

interface ControlPanelProps {
  state: BannerState;
  onUpdate: (updates: Partial<BannerState>) => void;
  onProcess: (mode: ProcessingMode) => void;
  onFileUpload: (file: File) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ state, onUpdate, onProcess, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-stone-800 p-6 rounded-lg border border-stone-700 flex flex-col gap-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold text-yellow-500 mb-1 font-amharic">Banner Details</h2>
        <p className="text-xs text-stone-400">Edit the text contents below</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
            Business Name (Main)
          </label>
          <input
            type="text"
            className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-yellow-400 font-bold focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all font-amharic"
            value={state.businessName}
            onChange={(e) => onUpdate({ businessName: e.target.value })}
            placeholder="Enter business name..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
            Top Description / Category
          </label>
          <input
            type="text"
            className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all font-amharic"
            value={state.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Enter description..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
            Bottom Slogan / Tagline
          </label>
          <input
            type="text"
            className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all font-amharic"
            value={state.subtitle}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            placeholder="Enter subtitle..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="text"
            className="w-full bg-stone-900 border border-stone-600 rounded p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all font-mono"
            value={state.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="+251..."
          />
        </div>
      </div>

      <div className="border-t border-stone-700 pt-6">
        <h2 className="text-xl font-bold text-yellow-500 mb-1">Background Image</h2>
        <p className="text-xs text-stone-400 mb-4">Upload your own or generate one with AI</p>

        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 bg-stone-700 hover:bg-stone-600 text-white py-3 px-4 rounded transition-colors border border-stone-600"
          >
            <Upload size={18} />
            Upload Image
          </button>

          <div className="grid grid-cols-2 gap-3">
             <button
              onClick={() => onProcess(ProcessingMode.CLEANING)}
              disabled={!state.imageUrl || state.isProcessing}
              className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded transition-all border ${
                !state.imageUrl || state.isProcessing
                  ? 'bg-stone-800 border-stone-700 text-stone-600 cursor-not-allowed'
                  : 'bg-indigo-900/30 border-indigo-500/50 hover:bg-indigo-900/50 text-indigo-200'
              }`}
            >
              <Eraser size={20} />
              <span className="text-xs font-medium text-center">Clean Old Text</span>
            </button>

            <button
              onClick={() => onProcess(ProcessingMode.GENERATING)}
              disabled={state.isProcessing}
              className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded transition-all border ${
                state.isProcessing
                  ? 'bg-stone-800 border-stone-700 text-stone-600 cursor-not-allowed'
                  : 'bg-green-900/30 border-green-500/50 hover:bg-green-900/50 text-green-200'
              }`}
            >
              <Wand2 size={20} />
              <span className="text-xs font-medium text-center">Generate New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-stone-700">
         <div className="bg-yellow-900/20 border border-yellow-700/50 p-3 rounded mb-4">
            <p className="text-yellow-200 text-xs flex items-start gap-2">
                <RefreshCw size={14} className="mt-0.5 flex-shrink-0" />
                <span>Tip: Use "Clean Old Text" to remove text from uploaded images.</span>
            </p>
         </div>

         <button 
           className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-yellow-900/20"
           onClick={() => alert("Use a screenshot tool to save your banner!")}
         >
           <Download size={20} />
           Download Banner
         </button>
      </div>
    </div>
  );
};

export default ControlPanel;