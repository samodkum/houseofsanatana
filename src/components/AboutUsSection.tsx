import React from 'react';
import { Sparkles, Shield, Compass, HeartHandshake } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about-us" className="relative w-full py-20 sm:py-28 bg-[#F7F1E5] border-t border-[#D9C6A8]/40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Radial Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#C7833D]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#66705A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image: Sacred Ritual / Aarti */}
              <div className="relative rounded-3xl overflow-hidden border border-[#B08A4A]/30 shadow-[0_20px_50px_rgba(51,44,37,0.12)] aspect-[4/5] group bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80" 
                  alt="Sacred Vedic Aarti and Rituals" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8F6E5B]/90 via-[#8F6E5B]/30 to-transparent" />
                
                {/* Floating Quote inside picture */}
                <div className="absolute bottom-6 inset-x-6">
                  <span className="font-sanskrit text-[#B08A4A] text-sm block mb-1 drop-shadow-sm font-semibold">
                    ॥ धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः ॥
                  </span>
                  <p className="font-dm text-xs text-[#F7F1E5] italic leading-relaxed">
                    "Dharma protects those who uphold it. In every flame and every pilgrimage, the divine endures."
                  </p>
                </div>
              </div>

              {/* Floating Overlapping Card: Consecration Seal */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#F7F1E5]/95 border border-[#B08A4A]/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(51,44,37,0.15)] backdrop-blur-md max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#C7833D]/15 border border-[#C7833D]/30 flex items-center justify-center text-[#C7833D]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B]">Temple Consecrated</h4>
                    <span className="text-[10px] font-dm text-[#C7833D] uppercase tracking-wider font-semibold">Direct From Source</span>
                  </div>
                </div>
                <p className="text-[11px] font-dm text-[#8F6E5B]/80 leading-tight">
                  Every grain of samagri and every pilgrimage itinerary is approved by Vedic Acharyas.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Mission, Story & Impact Numbers */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Sanskrit Shloka Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B08A4A]/15 border border-[#B08A4A]/30 text-[#8F6E5B] text-xs font-dm font-bold tracking-widest uppercase mb-4 self-start shadow-xs">
              <span className="text-[#C7833D]">॥ सनातन धर्मस्य मूलम् ॥</span>
              <span className="text-[#B08A4A]">&bull;</span>
              <span>Our Sacred Story</span>
            </div>

            {/* Main Title */}
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#8F6E5B] leading-tight">
              Bridging Eternal Vedic Heritage with Modern Devotion
            </h2>

            {/* Story Paragraphs */}
            <div className="mt-6 space-y-4 font-dm text-sm sm:text-[15px] text-[#8F6E5B]/85 leading-relaxed font-normal">
              <p>
                <strong className="text-[#8F6E5B] font-semibold">House of Sanatan</strong> was established with a singular, unyielding devotion: to restore untainted sanctity to daily Hindu spiritual practice and pilgrimage. In an era where ritual items are compromised by synthetic chemicals and pilgrimages often become stressful logistical struggles, we created an authentic sanctuary.
              </p>
              <p>
                For your home, we handcraft <span className="text-[#C7833D] font-semibold">certified pure Pooja Kits</span>—unadulterated Bhimseni camphor, natural forest dhoop, and brass cast by multi-generational temple sculptors. For your spiritual journey, we engineer <span className="text-[#66705A] font-semibold">Curated Spiritual Yatras</span>—ensuring elderly devotees, families, and seekers experience Kedarnath, Kashi, and the Jyotirlingas with serene VIP darshan, scholar guidance, and profound peace of mind.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/80 border border-[#66705A]/25 shadow-xs flex flex-col hover:border-[#66705A]/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#66705A]/15 flex items-center justify-center text-[#66705A] mb-2">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B]">100% Vedic Purity</h4>
                <p className="text-xs font-dm text-[#8F6E5B]/75 mt-1">Zero synthetic wax, unpolished sandalwood & lab-verified authenticity.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-[#B08A4A]/25 shadow-xs flex flex-col hover:border-[#B08A4A]/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#B08A4A]/15 flex items-center justify-center text-[#B08A4A] mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B]">Soulful Yatras</h4>
                <p className="text-xs font-dm text-[#8F6E5B]/75 mt-1">Hassle-free temple passes, elderly care & authentic spiritual immersion.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-[#C7833D]/25 shadow-xs flex flex-col hover:border-[#C7833D]/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#C7833D]/15 flex items-center justify-center text-[#C7833D] mb-2">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B]">Devotee First</h4>
                <p className="text-xs font-dm text-[#8F6E5B]/75 mt-1">Direct support from Vedic Acharyas and dedicated pilgrimage concierges.</p>
              </div>
            </div>

            {/* Impact Numbers Counter */}
            <div className="mt-10 pt-8 border-t border-[#D9C6A8]/40 grid grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
              <div>
                <div className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#C7833D]">
                  50,000+
                </div>
                <div className="font-dm text-xs text-[#8F6E5B] uppercase tracking-wider font-medium mt-1">
                  Devotees Served
                </div>
              </div>

              <div>
                <div className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#B08A4A]">
                  100+
                </div>
                <div className="font-dm text-xs text-[#8F6E5B] uppercase tracking-wider font-medium mt-1">
                  Temples & Circuits
                </div>
              </div>

              <div>
                <div className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#66705A]">
                  100%
                </div>
                <div className="font-dm text-xs text-[#8F6E5B] uppercase tracking-wider font-medium mt-1">
                  Vedic Authenticity
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

