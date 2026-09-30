import React from 'react';
import { ShieldCheck, Sparkles, Plane, Leaf, Award } from 'lucide-react';

export const TrustTicker: React.FC = () => {
  const trustPoints = [
    {
      icon: <Sparkles className="w-4 h-4 text-[#b45309]" />,
      text: '100% Vedic & Consecrated Samagri'
    },
    {
      icon: <Plane className="w-4 h-4 text-[#b45309]" />,
      text: 'Curated Spiritual Yatras with VIP Darshan'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#b45309]" />,
      text: 'Lab Assayed Pure Sandalwood, Camphor & Silver'
    },
    {
      icon: <Leaf className="w-4 h-4 text-[#b45309]" />,
      text: 'Ethically Sourced from Sacred Groves & Gaushalas'
    },
    {
      icon: <Award className="w-4 h-4 text-[#b45309]" />,
      text: 'Pan-India & Global Express Sacred Delivery'
    }
  ];

  return (
    <div className="relative w-full bg-[#D9C6A8]/20 border-y border-[#D9C6A8] py-3.5 sm:py-4 overflow-hidden select-none z-20 shadow-sm">
      {/* Subtle gold etched line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B08A4A]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs sm:text-[13px] font-dm tracking-wide text-[#8F6E5B]">
          {trustPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="p-1 rounded-full bg-white border border-[#D9C6A8] flex items-center justify-center shrink-0 shadow-xs">
                {point.icon}
              </span>
              <span className="font-medium whitespace-nowrap text-[#8F6E5B]">
                {point.text}
              </span>
              {index !== trustPoints.length - 1 && (
                <span className="hidden xl:inline text-[#B08A4A] ml-4 font-bold">✦</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B08A4A]/30 to-transparent" />
    </div>
  );
};
