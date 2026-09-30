import React from 'react';
import { cn } from '../lib/utils';

interface NavbarProps {
  isOpen: boolean;
  onToggleMenu: () => void;
  onGetStarted?: () => void;
  currentPage?: 'home' | 'mall' | 'travel' | 'join' | 'media';
  onNavigatePage?: (page: 'home' | 'mall' | 'travel' | 'join' | 'media') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isOpen, 
  onToggleMenu,
}) => {
  return (
    <header className="fixed top-5 sm:top-7 left-5 sm:left-8 z-[90] pointer-events-auto select-none flex items-center">
      {/* 
        Compact Floating 3-Line Menu Trigger Button
        Styled in the EXACT color and gradient of the word "SANATANA":
        linear-gradient(180deg, #1A1612 0%, #26201B 45%, #332C25 100%)
      */}
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={cn(
          "group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-2xl backdrop-blur-xl transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer border active:scale-95 overflow-hidden shrink-0",
          isOpen
            ? "border-[#D9C6A8] text-[#F7F1E5] shadow-[0_0_30px_rgba(176,138,74,0.55),_0_10px_25px_rgba(0,0,0,0.9)]"
            : "border-[#B08A4A]/60 hover:border-[#D9C6A8] text-[#F7F1E5] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(176,138,74,0.35)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.9),_0_0_30px_rgba(176,138,74,0.55)]"
        )}
        style={{
          background: 'linear-gradient(180deg, #1A1612 0%, #26201B 45%, #332C25 100%)',
        }}
      >
        {/* Subtle Shimmer Light Sweep on Hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#B08A4A]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center w-6 h-6">
          {/* Top Line */}
          <span
            className={cn(
              "absolute h-[2px] rounded-full transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#F7F1E5] group-hover:bg-[#D9C6A8]",
              isOpen
                ? "w-5 rotate-45 translate-y-0"
                : "w-5 -translate-y-1.5 group-hover:scale-x-105"
            )}
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(247, 241, 229, 0.4)'
            }}
          />

          {/* Middle Line */}
          <span
            className={cn(
              "absolute h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#D9C6A8] group-hover:bg-[#F7F1E5]",
              isOpen
                ? "w-0 opacity-0 scale-x-0"
                : "w-3.5 group-hover:w-5 opacity-100 scale-x-100 translate-y-0"
            )}
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(217, 198, 168, 0.4)'
            }}
          />

          {/* Bottom Line */}
          <span
            className={cn(
              "absolute h-[2px] rounded-full transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#F7F1E5] group-hover:bg-[#D9C6A8]",
              isOpen
                ? "w-5 -rotate-45 translate-y-0"
                : "w-5 translate-y-1.5 group-hover:scale-x-105"
            )}
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(247, 241, 229, 0.4)'
            }}
          />
        </div>
      </button>
    </header>
  );
};
