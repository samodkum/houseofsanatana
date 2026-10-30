import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'kit' | 'yatra'>('all');

  const filteredTestimonials = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.type === filter);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FEFBF2] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#221508]">
              Words of Reverence & Trust
            </h2>
            <p className="mt-3 font-dm text-sm sm:text-base text-[#221508] leading-relaxed font-medium">
              Read how authentic samagri elevated sacred home shrines and how curated yatras brought spiritual transformation to families across India and the global diaspora.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-dm font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#FE7613] text-white shadow-md'
                  : 'bg-white text-[#3D2619] border border-[#C59239]/30 hover:border-[#FE7613] hover:text-[#221508]'
              }`}
            >
              All Devotees
            </button>
            <button
              type="button"
              onClick={() => setFilter('kit')}
              className={`px-4 py-2 rounded-xl text-xs font-dm font-bold transition-all cursor-pointer ${
                filter === 'kit'
                  ? 'bg-[#FE7613] text-white shadow-md'
                  : 'bg-white text-[#3D2619] border border-[#C59239]/30 hover:border-[#FE7613] hover:text-[#221508]'
              }`}
            >
              Pooja Kit Reviews
            </button>
            <button
              type="button"
              onClick={() => setFilter('yatra')}
              className={`px-4 py-2 rounded-xl text-xs font-dm font-bold transition-all cursor-pointer ${
                filter === 'yatra'
                  ? 'bg-[#FE7613] text-white shadow-md'
                  : 'bg-white text-[#3D2619] border border-[#C59239]/30 hover:border-[#FE7613] hover:text-[#221508]'
              }`}
            >
              Yatra Experiences
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C59239]/30 hover:border-[#C59239] transition-all flex flex-col justify-between shadow-[0_10px_35px_rgba(34,21,8,0.06)]"
            >
              <div>
                {/* Header with stars and type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#FE7613]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FE7613]" />
                    ))}
                  </div>

                  <span className={`text-[11px] font-dm px-3 py-1 rounded-full font-medium ${
                    t.type === 'kit' 
                      ? 'bg-[#98555E]/10 text-[#98555E] border border-[#98555E]/20' 
                      : 'bg-[#0A4C83]/10 text-[#0A4C83] border border-[#0A4C83]/20'
                  }`}>
                    {t.type === 'kit' ? '🪔 Pooja Box' : '🕉️ Sacred Yatra'}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="font-dm text-sm text-[#221508] leading-relaxed italic mb-6 font-medium">
                  "{t.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-[#C59239]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-cormorant text-base font-semibold text-[#221508] flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#607427]" />
                  </h4>
                  <p className="font-dm text-xs text-[#3D2619]/70">
                    {t.location} {t.role && `• ${t.role}`}
                  </p>
                </div>

                <span className="text-[11px] font-dm text-[#0A4C83] bg-[#FEFBF2] px-2.5 py-1 rounded-lg border border-[#C59239]/30 max-w-[180px] truncate text-right font-medium">
                  {t.productOrTripTitle}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
