import React from 'react';
import { ShieldCheck, Sparkles, Plane, Leaf, Award } from 'lucide-react';

export const TrustTicker: React.FC = () => {
  const trustPoints = [
    {
      icon: <Sparkles className="w-4 h-4 text-[#FE7613]" />,
      text: '100% Vedic & Consecrated Samagri'
    },
    {
      icon: <Plane className="w-4 h-4 text-[#0A4C83]" />,
      text: 'Curated Spiritual Yatras with VIP Darshan'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#C59239]" />,
      text: 'Lab Assayed Pure Sandalwood, Camphor & Silver'
    },
    {
      icon: <Leaf className="w-4 h-4 text-[#607427]" />,
      text: 'Ethically Sourced from Sacred Groves & Gaushalas'
    },
    {
      icon: <Award className="w-4 h-4 text-[#FE7613]" />,
      text: 'Pan-India & Global Express Sacred Delivery'
    }
  ];

  return (
    <div className="relative w-full bg-[#FEFBF2] border-y border-[#C59239]/25 py-3.5 sm:py-4 overflow-hidden select-none z-20 shadow-xs">
      {/* Subtle gold etched line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59239]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs sm:text-[13px] font-dm tracking-wide text-[#3D2619]">
          {trustPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="p-1 rounded-full bg-white border border-[#C59239]/30 flex items-center justify-center shrink-0 shadow-2xs">
                {point.icon}
              </span>
              <span className="font-medium whitespace-nowrap text-[#221508]">
                {point.text}
              </span>
              {index !== trustPoints.length - 1 && (
                <span className="hidden xl:inline text-[#C59239] ml-4 font-bold">✦</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59239]/30 to-transparent" />
    </div>
  );
};
