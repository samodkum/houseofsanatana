import React from 'react';
import { Sparkles, Shield, Compass, HeartHandshake } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about-us" className="relative w-full py-20 sm:py-28 bg-[#FEFBF2] border-t border-[#C59239]/20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Radial Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#3DB3E4]/12 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C59239]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image: Sacred Ritual / Aarti */}
              <div className="relative rounded-3xl overflow-hidden border border-[#C59239]/30 shadow-[0_20px_50px_rgba(61,179,228,0.15)] aspect-[4/5] group bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80" 
                  alt="Sacred Vedic Aarti and Rituals" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#221508]/90 via-[#221508]/30 to-transparent" />
                
                {/* Floating Quote inside picture */}
                <div className="absolute bottom-6 inset-x-6">
                  <span className="font-sanskrit text-[#3DB3E4] text-sm block mb-1 drop-shadow-sm font-semibold">
                    ॥ धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः ॥
                  </span>
                  <p className="font-dm text-xs text-[#FEFBF2] italic leading-relaxed">
                    "Dharma protects those who uphold it. In every flame and every pilgrimage, the divine endures."
                  </p>
                </div>
              </div>

              {/* Floating Overlapping Card: Consecration Seal */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#FEFBF2]/95 border border-[#3DB3E4]/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(34,21,8,0.15)] backdrop-blur-md max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#3DB3E4]/15 border border-[#3DB3E4]/30 flex items-center justify-center text-[#3DB3E4]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cormorant text-base font-semibold text-[#221508]">Temple Consecrated</h4>
                    <span className="text-[10px] font-dm text-[#3DB3E4] uppercase tracking-wider font-semibold">Direct From Source</span>
                  </div>
                </div>
                <p className="text-[11px] font-dm text-[#3D2619]/80 leading-tight">
                  Every grain of samagri and every pilgrimage itinerary is approved by Vedic Acharyas.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Mission, Story & Impact Numbers */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Main Title */}
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#221508] leading-tight">
              Bridging Eternal Vedic Heritage with Modern Devotion
            </h2>

            {/* Story Paragraphs */}
            <div className="mt-6 space-y-4 font-dm text-sm sm:text-[15px] text-[#221508] leading-relaxed font-medium">
              <p>
                <strong className="text-[#221508] font-semibold">House of Sanatan</strong> was established with a singular, unyielding devotion: to restore untainted sanctity to daily Hindu spiritual practice and pilgrimage. In an era where ritual items are compromised by synthetic chemicals and pilgrimages often become stressful logistical struggles, we created an authentic sanctuary.
              </p>
              <p>
                For your home, we handcraft <span className="text-[#98555E] font-semibold">certified pure Pooja Kits</span>—unadulterated Bhimseni camphor, natural forest dhoop, and brass cast by multi-generational temple sculptors. For your spiritual journey, we engineer <span className="text-[#3DB3E4] font-semibold">Curated Spiritual Yatras</span>—ensuring elderly devotees, families, and seekers experience Kedarnath, Kashi, and the Jyotirlingas with serene VIP darshan, scholar guidance, and profound peace of mind.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/90 border border-[#98555E]/25 shadow-xs flex flex-col hover:border-[#98555E]/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#98555E]/15 flex items-center justify-center text-[#98555E] mb-2">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-cormorant text-base font-semibold text-[#221508]">100% Vedic Purity</h4>
                <p className="text-xs font-dm text-[#221508] font-medium mt-1">Zero synthetic wax, unpolished sandalwood & lab-verified authenticity.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#3DB3E4]/25 shadow-xs flex flex-col hover:border-[#3DB3E4]/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#3DB3E4]/15 flex items-center justify-center text-[#3DB3E4] mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-cormorant text-base font-semibold text-[#221508]">Soulful Yatras</h4>
                <p className="text-xs font-dm text-[#221508] font-medium mt-1">Hassle-free temple passes, elderly care & authentic spiritual immersion.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[#FE7613]/25 shadow-xs flex flex-col hover:border-[#FE7613]/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#FE7613]/15 flex items-center justify-center text-[#FE7613] mb-2">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-cormorant text-base font-semibold text-[#221508]">Devotee First</h4>
                <p className="text-xs font-dm text-[#221508] font-medium mt-1">Direct support from Vedic Acharyas and dedicated pilgrimage concierges.</p>
              </div>
            </div>

            {/* Impact Numbers Counter */}
            <div className="mt-10 pt-8 border-t border-[#C59239]/20 grid grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
              <div>
                <div className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FE7613]">
                  50,000+
                </div>
                <div className="font-dm text-xs text-[#221508] uppercase tracking-wider font-semibold mt-1">
                  Devotees Served
                </div>
              </div>

              <div>
                <div className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3DB3E4]">
                  100+
                </div>
                <div className="font-dm text-xs text-[#221508] uppercase tracking-wider font-semibold mt-1">
                  Temples & Circuits
                </div>
              </div>

              <div>
                <div className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#607427]">
                  100%
                </div>
                <div className="font-dm text-xs text-[#221508] uppercase tracking-wider font-semibold mt-1">
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

