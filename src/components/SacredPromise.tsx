import React from 'react';
import { Flame, Compass, HeartHandshake, Award } from 'lucide-react';

export const SacredPromise: React.FC = () => {
  const promises = [
    {
      icon: <Flame className="w-6 h-6 text-[#607427]" />,
      title: 'Vedic Agamic Sanctity',
      desc: 'Our samagri recipes follow the ancient Rigvedic and Agamic texts. Zero paraffin, animal-bone ash, or synthetic fragrances.',
      theme: {
        badgeBg: 'bg-[#607427]/10',
        badgeText: 'text-[#607427]',
        badgeBorder: 'border-[#607427]/30',
        iconBg: 'bg-[#607427]/10',
        iconBorder: 'border-[#607427]/30',
        hoverBorder: 'hover:border-[#607427]',
        tag: 'Sage Sanctity'
      }
    },
    {
      icon: <Award className="w-6 h-6 text-[#C59239]" />,
      title: 'Peetham & Temple Consecration',
      desc: 'All brass idols, silver coins, and rudrakshas are energized at venerable peethams including Kashi Vishwanath and Pashupatinath.',
      theme: {
        badgeBg: 'bg-[#C59239]/15',
        badgeText: 'text-[#C59239]',
        badgeBorder: 'border-[#C59239]/40',
        iconBg: 'bg-[#C59239]/15',
        iconBorder: 'border-[#C59239]/40',
        hoverBorder: 'hover:border-[#C59239]',
        tag: 'Temple Gold Lineage'
      }
    },
    {
      icon: <Compass className="w-6 h-6 text-[#0A4C83]" />,
      title: 'VIP Pilgrim Logistics',
      desc: 'Confirmed temple garbhagriha tokens, helicopter priority, and luxury sanitised vehicle fleets across all Himalayan and southern circuits.',
      theme: {
        badgeBg: 'bg-[#0A4C83]/15',
        badgeText: 'text-[#0A4C83]',
        badgeBorder: 'border-[#0A4C83]/30',
        iconBg: 'bg-[#0A4C83]/15',
        iconBorder: 'border-[#0A4C83]/30',
        hoverBorder: 'hover:border-[#0A4C83]',
        tag: 'Wind Blue Circuits'
      }
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#FE7613]" />,
      title: 'Devotee Seva Guarantee',
      desc: 'Senior citizen dedicated support staff, doctor on call during high-altitude yatras, and complimentary replacement of any broken ritual item.',
      theme: {
        badgeBg: 'bg-[#FE7613]/10',
        badgeText: 'text-[#FE7613]',
        badgeBorder: 'border-[#FE7613]/30',
        iconBg: 'bg-[#FE7613]/10',
        iconBorder: 'border-[#FE7613]/30',
        hoverBorder: 'hover:border-[#FE7613]',
        tag: 'Sacred Agni Seva'
      }
    }
  ];

  return (
    <section className="relative w-full py-20 sm:py-24 bg-[#FEFBF2] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FE7613]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#221508]">
            Our Unwavering Promise to Devotees
          </h2>
          <p className="mt-4 font-dm text-sm sm:text-base text-[#221508] leading-relaxed font-medium">
            In every offering and pilgrimage, purity is not an option—it is the foundational pillar of Dharma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {promises.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-white border border-[#C59239]/30 ${p.theme.hoverBorder} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-[0_10px_30px_rgba(34,21,8,0.05)] hover:shadow-xl`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${p.theme.iconBg} border ${p.theme.iconBorder} flex items-center justify-center mb-5 shadow-xs`}>
                  {p.icon}
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-[#221508] mb-2">
                  {p.title}
                </h3>
                <p className="font-dm text-xs sm:text-[13px] text-[#221508] leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C59239]/20 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-dm font-bold uppercase tracking-wider ${p.theme.badgeBg} ${p.theme.badgeText} border ${p.theme.badgeBorder}`}>
                  {p.theme.tag}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-dm text-[#C59239] font-medium">
                  <Sparkles className="w-3 h-3 text-[#FE7613]" />
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
