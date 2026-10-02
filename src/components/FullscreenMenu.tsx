import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube, MessageCircle, Sparkles } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  sanskrit: string;
  isExternal?: boolean;
  href: string;
  page?: 'home' | 'mall' | 'travel' | 'join' | 'media';
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Home', sanskrit: '॥ मुखपृष्ठम् ॥', href: '#home', page: 'home' },
  { id: 'join', label: 'Join House of Sanatana', sanskrit: '॥ सङ्घ प्रवेशम् ॥', isExternal: false, href: '#join', page: 'join' },
  { id: 'mall', label: 'Santana Mall', sanskrit: '॥ सनातन हाट ॥', isExternal: false, href: '#santana-mall', page: 'mall' },
  { id: 'travel', label: 'Sacred Yatras', sanskrit: '॥ तीर्थ यात्रा ॥', isExternal: false, href: '#travel', page: 'travel' },
  { id: 'media', label: 'Knowledge & Media', sanskrit: '॥ ज्ञान गङ्गा ॥', isExternal: false, href: '#media', page: 'media' },
];

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage?: (page: 'home' | 'mall' | 'travel' | 'join' | 'media', sectionId?: string) => void;
  currentPage?: 'home' | 'mall' | 'travel' | 'join' | 'media';
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
  currentPage = 'home',
}) => {
  const [activeItem, setActiveItem] = useState<string>(currentPage);

  useEffect(() => {
    setActiveItem(currentPage);
  }, [currentPage, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll cleanly
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="motion-overlay-menu"
          initial={{ opacity: 0, clipPath: 'circle(0px at 48px 48px)' }}
          animate={{ opacity: 1, clipPath: 'circle(150vmax at 48px 48px)' }}
          exit={{ opacity: 0, clipPath: 'circle(0px at 48px 48px)' }}
          transition={{ 
            duration: isOpen ? 0.85 : 0.65,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="fixed inset-0 z-[9999] text-[#F7F1E5] flex flex-col justify-between overflow-hidden select-none pointer-events-auto bg-[#8C4E1D]"
          style={{
            background: 'radial-gradient(ellipse 110% 110% at 8% 8%, #9E5D24 0%, #8C4E1D 35%, #6E3812 70%, #462208 100%)',
            willChange: 'clip-path, opacity'
          }}
        >
          {/* Subtle Sacred Geometry Watermark Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, #F7F1E5 1px, transparent 1px)`,
              backgroundSize: '36px 36px'
            }}
          />

          {/* Ambient Warm Golden Glow */}
          <div 
            className="absolute top-0 right-0 w-[550px] h-[550px] pointer-events-none opacity-20 rounded-full blur-[100px]"
            style={{ backgroundColor: '#D9C6A8' }}
          />

          {/* Top Header Row inside Menu */}
          <div className="relative z-20 w-full px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
            <div className="flex items-center gap-3 pl-16 sm:pl-20">
              <span className="font-sanskrit text-sm font-bold text-[#D9C6A8]">॥ सनातन सूची ॥</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9C6A8]/50" />
              <span className="font-dm text-xs uppercase tracking-[0.25em] text-[#F7F1E5]/80 font-semibold">
                House of Sanatana
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-dm text-[#D9C6A8]/80 uppercase tracking-wider hidden sm:inline-block">
                Press ESC to close
              </span>
            </div>
          </div>

          {/* SCROLLABLE NAVIGATION LIST */}
          <div 
            id="motion-menu-scrollable"
            className="relative z-20 flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth py-6 sm:py-8 px-6 sm:px-12 flex flex-col justify-center"
          >
            <nav className="max-w-4xl mx-auto w-full flex flex-col items-center sm:items-start gap-1 sm:gap-1.5">
              {MENU_ITEMS.map((item, index) => {
                const isActive = activeItem === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.22 + index * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setActiveItem(item.id)}
                    className="w-full relative flex items-center"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveItem(item.id);
                        onClose();
                        if (item.page && onNavigatePage) {
                          onNavigatePage(item.page, item.href.replace('#', ''));
                        }
                      }}
                      className="group relative w-full flex items-center justify-between py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-2xl transition-all duration-200 cursor-pointer"
                    >
                      {/* Active / Hover Pill Highlight */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-all duration-200 pointer-events-none ${
                          isActive 
                            ? 'bg-[#F7F1E5] shadow-[0_10px_28px_rgba(0,0,0,0.25)] opacity-100 scale-100' 
                            : 'opacity-0 scale-95'
                        }`}
                      />

                      {/* Main Link Text in Cormorant Garamond Serif */}
                      <div className="relative z-10 flex items-baseline gap-3.5 sm:gap-5">
                        <span className={`font-dm text-xs sm:text-sm font-bold transition-colors duration-150 ${
                          isActive ? 'text-[#8C4E1D]' : 'text-[#D9C6A8]/70'
                        }`}>
                          0{index + 1}
                        </span>
                        <span className={`font-cormorant font-normal text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-tight tracking-tight transition-colors duration-150 ${
                          isActive ? 'text-[#26201B] font-semibold' : 'text-[#F7F1E5] group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                      </div>

                      {/* Sanskrit Subtext & Arrow */}
                      <div className="relative z-10 hidden md:flex items-center gap-3.5">
                        <span className={`font-sanskrit text-xs font-semibold transition-colors duration-150 ${
                          isActive ? 'text-[#8C4E1D]' : 'text-[#D9C6A8]/70'
                        }`}>
                          {item.sanskrit}
                        </span>
                        <ArrowUpRight 
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            isActive ? 'text-[#26201B] translate-x-0.5 -translate-y-0.5' : 'text-[#D9C6A8]/50 group-hover:text-white'
                          }`}
                        />
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Social & Footer Row inside Menu */}
          <div className="relative z-20 w-full px-6 sm:px-12 py-4 sm:py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-dm text-[#D9C6A8]/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D9C6A8]" />
              <span>Consecrated Vedic Sanctum &bull; House of Sanatana</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F7F1E5] transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F7F1E5] transition-all"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F7F1E5] transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F7F1E5] transition-all"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#F7F1E5] transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
