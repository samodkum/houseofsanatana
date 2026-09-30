import React from 'react';
import { ShieldCheck, Flame, Compass, HeartHandshake, Sparkles, Award } from 'lucide-react';

export const SacredPromise: React.FC = () => {
  const promises = [
    {
      icon: <Flame className="w-6 h-6 text-[#66705A]" />,
      title: 'Vedic Agamic Sanctity',
      desc: 'Our samagri recipes follow the ancient Rigvedic and Agamic texts. Zero paraffin, animal-bone ash, or synthetic fragrances.',
      theme: {
        badgeBg: 'bg-[#66705A]/10',
        badgeText: 'text-[#66705A]',
        badgeBorder: 'border-[#66705A]/25',
        iconBg: 'bg-[#66705A]/10',
        iconBorder: 'border-[#66705A]/25',
        hoverBorder: 'hover:border-[#66705A]',
        tag: 'Sage Sanctity'
      }
    },
    {
      icon: <Award className="w-6 h-6 text-[#B08A4A]" />,
      title: 'Peetham & Temple Consecration',
      desc: 'All brass idols, silver coins, and rudrakshas are energized at venerable peethams including Kashi Vishwanath and Pashupatinath.',
      theme: {
        badgeBg: 'bg-[#B08A4A]/15',
        badgeText: 'text-[#B08A4A]',
        badgeBorder: 'border-[#B08A4A]/30',
        iconBg: 'bg-[#B08A4A]/15',
        iconBorder: 'border-[#B08A4A]/30',
        hoverBorder: 'hover:border-[#B08A4A]',
        tag: 'Antique Gold Lineage'
      }
    },
    {
      icon: <Compass className="w-6 h-6 text-[#C7833D]" />,
      title: 'VIP Pilgrim Logistics',
      desc: 'Confirmed temple garbhagriha tokens, helicopter priority, and luxury sanitised vehicle fleets across all Himalayan and southern circuits.',
      theme: {
        badgeBg: 'bg-[#C7833D]/15',
        badgeText: 'text-[#C7833D]',
        badgeBorder: 'border-[#C7833D]/30',
        iconBg: 'bg-[#C7833D]/15',
        iconBorder: 'border-[#C7833D]/30',
        hoverBorder: 'hover:border-[#C7833D]',
        tag: 'Muted Saffron Seva'
      }
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#8F6E5B]" />,
      title: 'Devotee Seva Guarantee',
      desc: 'Senior citizen dedicated support staff, doctor on call during high-altitude yatras, and complimentary replacement of any broken ritual item.',
      theme: {
        badgeBg: 'bg-[#8F6E5B]/10',
        badgeText: 'text-[#8F6E5B]',
        badgeBorder: 'border-[#8F6E5B]/20',
        iconBg: 'bg-[#8F6E5B]/10',
        iconBorder: 'border-[#8F6E5B]/20',
        hoverBorder: 'hover:border-[#8F6E5B]',
        tag: 'Grounded Trust'
      }
    }
  ];

  return (
    <section className="relative w-full py-20 sm:py-24 bg-[#F7F1E5] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C7833D]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B08A4A]/15 border border-[#B08A4A]/30 text-[#8F6E5B] text-xs font-dm font-bold tracking-widest uppercase mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7833D]" />
            <span>The Sacred Guarantee</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#8F6E5B]">
            Our Unwavering Promise to Devotees
          </h2>
          <p className="mt-4 font-dm text-sm sm:text-base text-[#8F6E5B]/80 leading-relaxed font-normal">
            In every offering and pilgrimage, purity is not an option—it is the foundational pillar of Dharma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {promises.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-white/85 border border-[#D9C6A8] ${p.theme.hoverBorder} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-[0_10px_30px_rgba(51,44,37,0.05)] hover:shadow-xl`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${p.theme.iconBg} border ${p.theme.iconBorder} flex items-center justify-center mb-5 shadow-xs`}>
                  {p.icon}
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-[#8F6E5B] mb-2">
                  {p.title}
                </h3>
                <p className="font-dm text-xs sm:text-[13px] text-[#8F6E5B]/75 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9C6A8]/60 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-dm font-bold uppercase tracking-wider ${p.theme.badgeBg} ${p.theme.badgeText} border ${p.theme.badgeBorder}`}>
                  {p.theme.tag}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-dm text-[#8F6E5B]/70 font-medium">
                  <Sparkles className="w-3 h-3 text-[#B08A4A]" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
