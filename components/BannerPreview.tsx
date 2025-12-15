import React, { useRef } from 'react';
import { BannerState } from '../types';

interface BannerPreviewProps {
  state: BannerState;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ state }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex justify-center items-center p-4 bg-stone-800 rounded-lg shadow-xl overflow-hidden border border-stone-700">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[600px] aspect-square bg-stone-900 shadow-2xl overflow-hidden rounded-md group border-4 border-stone-800"
      >
        {/* Background Image - Optimized for MAXIMUM visibility of Food & Coffee */}
        {state.imageUrl ? (
          <img 
            src={state.imageUrl} 
            alt="Ethiopian Food and Coffee" 
            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-500">
            <span className="italic">No Image Selected</span>
          </div>
        )}

        {/* Minimal Overlay - Vignette only, keeping center clear for the food */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none"></div>

        {/* Decorative Ethiopian Flag Accent (Top Right Corner) */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none opacity-90 z-20">
            <div className="absolute top-0 right-0 w-full h-2 bg-[#009A49] shadow-sm transform rotate-45 translate-x-8 -translate-y-2"></div>
            <div className="absolute top-0 right-0 w-full h-2 bg-[#FEDD00] shadow-sm transform rotate-45 translate-x-6 translate-y-1"></div>
            <div className="absolute top-0 right-0 w-full h-2 bg-[#DA121A] shadow-sm transform rotate-45 translate-x-4 translate-y-4"></div>
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col items-center py-8 px-4 pointer-events-none justify-between z-10">
          
          {/* Top: Description / Category */}
          <div className="text-center w-full pt-4 animate-fade-in-down">
            <div className="inline-block relative">
                {/* Cultural Banner Shape Background */}
                <div className="absolute inset-0 bg-[#009A49] transform -skew-x-12 opacity-90 shadow-lg border-b-2 border-[#FEDD00]"></div>
                <h2 className="relative font-amharic font-bold text-xl md:text-2xl text-white drop-shadow-md tracking-wide px-8 py-2">
                  {state.title}
                </h2>
            </div>
          </div>

          {/* Middle: Business Name (The Star) */}
          <div className="text-center w-full transform transition-transform hover:scale-105 duration-500">
             <div className="relative inline-block px-6 py-4">
                {/* Circular/Oval Glow behind main text to separate it from food background */}
                <div className="absolute inset-0 bg-black/40 blur-xl rounded-full scale-125"></div>
                <h1 className="relative font-amharic font-black text-5xl md:text-7xl text-[#FEDD00] leading-tight tracking-wide stroke-black drop-shadow-[0_5px_5px_rgba(0,0,0,1)]"
                    style={{ 
                        textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' 
                    }}>
                  {state.businessName}
                </h1>
             </div>
          </div>

          {/* Bottom Section: Slogan & Phone */}
          <div className="text-center w-full space-y-4 animate-fade-in-up pb-4">
             {/* Slogan */}
             <div className="inline-block bg-black/50 backdrop-blur-md border-l-4 border-[#DA121A] px-4 py-1 rounded-r-md">
                <h3 className="font-amharic font-bold text-lg md:text-xl text-white tracking-wider drop-shadow-md">
                {state.subtitle}
                </h3>
             </div>

            {/* Phone Badge */}
            <div className="block mt-2">
                <div className="relative inline-block group-hover:animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#009A49] via-[#FEDD00] to-[#DA121A] rounded-full opacity-100 shadow-lg"></div>
                    <div className="relative m-[2px] bg-stone-900 px-6 py-2 rounded-full">
                        <p className="text-white font-bold text-xl md:text-2xl font-mono tracking-widest flex items-center justify-center gap-2">
                            <span className="text-[#FEDD00]">📞</span> {state.phone}
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Border */}
        <div className="absolute bottom-0 left-0 right-0 h-3 flex pointer-events-none z-20 border-t border-black/20">
            <div className="w-1/3 h-full bg-[#009A49]"></div>
            <div className="w-1/3 h-full bg-[#FEDD00]"></div>
            <div className="w-1/3 h-full bg-[#DA121A]"></div>
        </div>
        
        {/* Loading Overlay */}
        {state.isProcessing && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-t-4 border-b-4 border-[#FEDD00] rounded-full animate-spin"></div>
              <p className="text-[#FEDD00] font-semibold animate-pulse tracking-widest font-amharic text-xl">Brewing Coffee & Cooking Wot...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerPreview;