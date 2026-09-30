import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F7F1E5] text-white pt-4 select-none overflow-hidden font-dm">
      
      {/* ======================================================== */}
      {/* 1. FULL-WIDTH STEPPED FOLDER TAB CONTAINER BORDER       */}
      {/* Retained exactly as requested with edge-to-edge contour  */}
      {/* ======================================================== */}
      <div className="w-full leading-none block">
        <svg 
          viewBox="0 0 1440 60" 
          className="w-full h-10 sm:h-14 md:h-18 lg:h-20 block" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path 
            d="M 0 60 
               L 0 46 
               L 360 46 
               C 400 46, 425 4, 465 4 
               L 1240 4 
               C 1280 4, 1305 46, 1345 46 
               L 1440 46 
               L 1440 60 Z" 
            fill="#C7833D" 
          />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN EDITORIAL FOOTER BODY                            */}
      {/* Styled after the refined editorial reference             */}
      {/* ======================================================== */}
      <div className="w-full bg-[#C7833D] text-[#F7F1E5] pt-6 sm:pt-10 pb-12 px-6 sm:px-10 lg:px-16 shadow-2xl relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">

          {/* Main 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Brand Name & Huge Elegant Serif Nav Links */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Brand Heading */}
              <a 
                href="#home" 
                className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#F7F1E5] tracking-tight hover:text-white transition-colors mb-8 sm:mb-10 block"
              >
                House Of Sanatana
              </a>

              {/* Large Stacked Nav Links */}
              <nav className="flex flex-col items-start gap-2 sm:gap-3.5" aria-label="Footer Navigation">
                <a 
                  href="#join" 
                  className="font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F7F1E5]/90 hover:text-white hover:translate-x-1.5 transition-all duration-200"
                >
                  Join House Of Sanatana
                </a>
                <a 
                  href="#travel" 
                  className="font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F7F1E5]/90 hover:text-white hover:translate-x-1.5 transition-all duration-200"
                >
                  Sacred Yatras
                </a>
                <a 
                  href="#santana-mall" 
                  className="font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F7F1E5]/90 hover:text-white hover:translate-x-1.5 transition-all duration-200"
                >
                  Santana Mall
                </a>
                <a 
                  href="#the-house" 
                  className="font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F7F1E5]/90 hover:text-white hover:translate-x-1.5 transition-all duration-200"
                >
                  The House
                </a>
                <a 
                  href="#three-ways-to-join" 
                  className="font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F7F1E5]/90 hover:text-white hover:translate-x-1.5 transition-all duration-200"
                >
                  Vedic Guidance
                </a>
                <a 
                  href="#about-us" 
                  className="font-cormorant font-normal text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F7F1E5]/90 hover:text-white hover:translate-x-1.5 transition-all duration-200"
                >
                  About Us
                </a>
              </nav>
            </div>

            {/* Right Column: Newsletter & Social Connect Blocks */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 sm:gap-10 pt-2 lg:pt-4">
              
              {/* Newsletter Block */}
              <div className="flex flex-col items-start max-w-md">
                <h3 className="font-dm font-semibold text-base sm:text-lg text-[#F7F1E5] mb-2 tracking-tight">
                  Sanatan Prana Newsletter
                </h3>
                <p className="font-dm text-xs sm:text-[13px] leading-relaxed text-[#F7F1E5]/85 mb-4 font-normal">
                  Your fresh, sacred resource for auspicious dates, seasonal panchang guidance, temple yatras, and Vedic rituals. Consecrated blessings right in your inbox.
                </p>
                <a 
                  href="#newsletter"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F7F1E5] hover:bg-white text-[#C7833D] font-dm font-bold text-xs sm:text-[13px] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C7833D]" />
                </a>
              </div>

              {/* Let's Connect Block */}
              <div className="flex flex-col items-start max-w-md pt-2">
                <h3 className="font-dm font-semibold text-base sm:text-lg text-[#F7F1E5] mb-2 tracking-tight">
                  Let's Connect
                </h3>
                <p className="font-dm text-xs sm:text-[13px] leading-relaxed text-[#F7F1E5]/85 mb-4 font-normal">
                  You can follow our sacred journey, artisan chronicles, and daily Vedic wisdom anywhere and everywhere!
                </p>
                
                {/* Circular Pill Social Icons */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7F1E5] text-[#C7833D] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="YouTube"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7F1E5] text-[#C7833D] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7F1E5] text-[#C7833D] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="X / Twitter"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7F1E5] text-[#C7833D] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>

                  <a 
                    href="https://wa.me/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="WhatsApp Desk"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F7F1E5] text-[#C7833D] hover:bg-white hover:scale-110 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* ---------------------------------------------------- */}
          {/* Sub-Footer Line: Questions, Copyright & Attribution */}
          {/* ---------------------------------------------------- */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] sm:text-xs font-dm text-[#E8D9C5]/75">
            {/* Left sub-footer */}
            <div className="flex flex-col gap-1">
              <span>Questions can be submitted at <a href="mailto:care@houseofsanatana.com" className="underline hover:text-white transition-colors">care@houseofsanatana.com</a></span>
              <span>Copyright {new Date().getFullYear()} | All Rights Reserved House Of Sanatana Media | <a href="#privacy" className="underline hover:text-white transition-colors">Privacy Notice</a></span>
            </div>

            {/* Right sub-footer */}
            <div className="flex flex-col sm:items-end gap-1">
              <span>Consecrated by accredited Peetham Acharyas</span>
              <span>Sanctum credit: <span className="underline">House Of Sanatana Guild</span></span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
