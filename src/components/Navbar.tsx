import React from 'react';
import { cn } from '../lib/utils';

interface NavbarProps {
  isOpen: boolean;
  onToggleMenu: () => void;
  onGetStarted?: () => void;
  currentPage?: 'home' | 'mall' | 'travel' | 'join' | 'media';
  onNavigatePage?: (page: 'home' | 'mall' | 'travel' | 'join' | 'media') => void;
  isHero?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isOpen, 
  onToggleMenu,
  isHero = false,
}) => {
  return (
    <header className="fixed top-5 sm:top-7 left-5 sm:left-8 z-[10000] pointer-events-auto select-none flex items-center">
      {/* 
        Compact Floating Menu Trigger Button
        Matches the exact color palette and theme of the HeaderActionButtons:
        - On Hero: Obsidian dark background (#1A1612) with sacred gold borders and accents
        - On Scrolled / Pages: Light ivory backdrop with subtle gold border and deep charcoal accents
        - When Open: Transitions into royal wine red (#51000F) matching the open navigation drawer
      */}
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={cn(
          "group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-xl transition-all duration-700 ease-in-out cursor-pointer border active:scale-95 overflow-hidden shrink-0",
          isOpen
            ? "border-[#E4B968] text-[#FEFBF2] shadow-[0_0_30px_rgba(197,146,57,0.55),_0_10px_25px_rgba(81,0,15,0.9)] bg-[#51000F]"
            : isHero
              ? "border-[#C59239]/60 hover:border-[#E4B968] text-[#E4B968] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(197,146,57,0.35)] hover:shadow-[0_8px_25px_rgba(197,146,57,0.45)]"
              : "bg-white/90 border-[#C59239]/40 hover:border-[#C59239] text-[#221508] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(197,146,57,0.25)]"
        )}
        style={
          isOpen
            ? { background: 'linear-gradient(180deg, #6A0D1D 0%, #51000F 55%, #3B000B 100%)' }
            : isHero
              ? { background: 'linear-gradient(180deg, #1A1612 0%, #26201B 45%, #332C25 100%)' }
              : undefined
        }
      >
        {/* Subtle Shimmer Light Sweep on Hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C59239]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center w-5 h-5 sm:w-5.5 sm:h-5.5">
          {/* Top Line */}
          <span
            className={cn(
              "absolute h-[2px] rounded-full transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "w-4 sm:w-5 rotate-45 translate-y-0 bg-[#FEFBF2] group-hover:bg-[#E4B968]"
                : isHero
                  ? "w-4 sm:w-4.5 -translate-y-1.5 group-hover:scale-x-105 bg-[#FEFBF2] group-hover:bg-[#E4B968]"
                  : "w-4 sm:w-4.5 -translate-y-1.5 group-hover:scale-x-105 bg-[#221508] group-hover:bg-[#C59239]"
            )}
            style={{
              boxShadow: isHero || isOpen ? '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(254, 251, 242, 0.4)' : undefined
            }}
          />

          {/* Middle Line */}
          <span
            className={cn(
              "absolute h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "w-0 opacity-0 scale-x-0"
                : isHero
                  ? "w-3 group-hover:w-4.5 opacity-100 scale-x-100 translate-y-0 bg-[#E4B968] group-hover:bg-[#FEFBF2]"
                  : "w-3 group-hover:w-4.5 opacity-100 scale-x-100 translate-y-0 bg-[#C59239] group-hover:bg-[#221508]"
            )}
            style={{
              boxShadow: isHero ? '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(228, 185, 104, 0.4)' : undefined
            }}
          />

          {/* Bottom Line */}
          <span
            className={cn(
              "absolute h-[2px] rounded-full transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isOpen
                ? "w-4 sm:w-5 -rotate-45 translate-y-0 bg-[#FEFBF2] group-hover:bg-[#E4B968]"
                : isHero
                  ? "w-4 sm:w-4.5 translate-y-1.5 group-hover:scale-x-105 bg-[#FEFBF2] group-hover:bg-[#E4B968]"
                  : "w-4 sm:w-4.5 translate-y-1.5 group-hover:scale-x-105 bg-[#221508] group-hover:bg-[#C59239]"
            )}
            style={{
              boxShadow: isHero || isOpen ? '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(254, 251, 242, 0.4)' : undefined
            }}
          />
        </div>
      </button>
    </header>
  );
};
