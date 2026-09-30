import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, CheckCircle2, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'kit' | 'yatra'>('all');

  const filteredTestimonials = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.type === filter);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#F7F1E5] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C6A8]/30 border border-[#B08A4A]/40 text-[#C7833D] text-xs font-dm font-bold tracking-widest uppercase mb-4 shadow-xs">
              <Heart className="w-3.5 h-3.5 text-[#B08A4A]" />
              <span>Devotee Experiences</span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#8F6E5B]">
              Words of Reverence & Trust
            </h2>
            <p className="mt-3 font-dm text-sm sm:text-base text-[#8F6E5B]/80 leading-relaxed font-normal">
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
                  ? 'bg-gradient-to-r from-[#C7833D] to-[#B08A4A] text-[#F7F1E5] shadow-md'
                  : 'bg-[#D9C6A8]/30 text-[#8F6E5B]/80 border border-[#D9C6A8] hover:border-[#B08A4A] hover:text-[#8F6E5B]'
              }`}
            >
              All Devotees
            </button>
            <button
              type="button"
              onClick={() => setFilter('kit')}
              className={`px-4 py-2 rounded-xl text-xs font-dm font-bold transition-all cursor-pointer ${
                filter === 'kit'
                  ? 'bg-gradient-to-r from-[#C7833D] to-[#B08A4A] text-[#F7F1E5] shadow-md'
                  : 'bg-[#D9C6A8]/30 text-[#8F6E5B]/80 border border-[#D9C6A8] hover:border-[#B08A4A] hover:text-[#8F6E5B]'
              }`}
            >
              Pooja Kit Reviews
            </button>
            <button
              type="button"
              onClick={() => setFilter('yatra')}
              className={`px-4 py-2 rounded-xl text-xs font-dm font-bold transition-all cursor-pointer ${
                filter === 'yatra'
                  ? 'bg-gradient-to-r from-[#C7833D] to-[#B08A4A] text-[#F7F1E5] shadow-md'
                  : 'bg-[#D9C6A8]/30 text-[#8F6E5B]/80 border border-[#D9C6A8] hover:border-[#B08A4A] hover:text-[#8F6E5B]'
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
              className="p-6 sm:p-8 rounded-3xl bg-white/85 border border-[#D9C6A8] hover:border-[#B08A4A] transition-all flex flex-col justify-between shadow-[0_10px_35px_rgba(51,44,37,0.06)]"
            >
              <div>
                {/* Header with stars and type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C7833D]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7833D]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-dm px-3 py-1 rounded-full bg-[#D9C6A8]/25 text-[#C7833D] border border-[#D9C6A8] font-medium">
                    {t.type === 'kit' ? '🪔 Pooja Box' : '🕉️ Sacred Yatra'}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="font-dm text-sm text-[#8F6E5B]/90 leading-relaxed italic mb-6 font-normal">
                  "{t.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-[#D9C6A8]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B] flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#66705A]" />
                  </h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/65">
                    {t.location} {t.role && `• ${t.role}`}
                  </p>
                </div>

                <span className="text-[11px] font-dm text-[#C7833D] bg-[#D9C6A8]/20 px-2.5 py-1 rounded-lg border border-[#D9C6A8] max-w-[180px] truncate text-right font-medium">
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
