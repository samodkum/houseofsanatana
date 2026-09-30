import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Plus, 
  Minus, 
  Sparkles, 
  MessageSquareQuote,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DividerOrnamental } from './ui/SacredPatterns';

export interface FAQItem {
  id: string;
  questionNumber: string;
  category: string;
  question: string;
  answer: string;
  sanskrit: string;
  acharyaName: string;
  acharyaRole: string;
  acharyaAvatar: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    questionNumber: '01',
    category: 'Purity & Samagri',
    sanskrit: '॥ शुद्धि प्रमाण ॥',
    question: 'How does House of Sanatan guarantee 100% purity & Agamic consecration for puja samagri?',
    answer: 'Every harvest of Chandan, Kumkum, Kasturi, and pure cow ghee undergoes stringent laboratory purity testing. They are consecrated (Praan Pratishtha) under authentic Agamic rituals by accredited Vedic Acharyas before dispatch to your home sanctum.',
    acharyaName: 'Acharya Vidyadhar Shastri',
    acharyaRole: 'Head of Agamic Consecration',
    acharyaAvatar: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'faq-2',
    questionNumber: '02',
    category: 'Luxury Yatras',
    sanskrit: '॥ तीर्थ मर्यादा ॥',
    question: 'What makes House of Sanatan Yatras suitable for multi-generational families and elders?',
    answer: 'Our Yatras eliminate all physical strain. We provide reserved VIP Garbhagriha darshans without long queues, low-floor luxury Mercedes coaches, on-tour medical staff with oxygen backup, 5-star Sattvic dining, and certified Sanskrit scholars guiding every temple parikrama.',
    acharyaName: 'Pt. Raghunath Acharya',
    acharyaRole: 'Director of Himalayan Circuits',
    acharyaAvatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'faq-3',
    questionNumber: '03',
    category: 'Vedic Guidance',
    sanskrit: '॥ आचार्य संग ॥',
    question: 'Can I consult an Acharya for personalized Muhurat & family Griha rituals?',
    answer: 'Yes. Through the Family HOS circle, members receive direct WhatsApp consultation with Peetham-accredited Acharyas who calculate personalized Janma Kundali muhurats, Vrat tithis, and provide mantra recitation recordings for all family samskaras.',
    acharyaName: 'Acharya Soumya Bhatt',
    acharyaRole: 'Jyotish & Samskara Guide',
    acharyaAvatar: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'faq-4',
    questionNumber: '04',
    category: 'Artisan Co-Creation',
    sanskrit: '॥ शिल्प संरक्षण ॥',
    question: 'How do the artisan guilds and social revolution partnerships work?',
    answer: 'We partner directly with 5th-generation brass sculptors in Swamimalai, botanical attar distillers in Kannauj, and organic samagri farmers. We eliminate all middlemen with guaranteed advance patronage and certify each artifact with an authenticity guild stamp.',
    acharyaName: 'Sthapati K. Sundaram',
    acharyaRole: 'Master Metallurgical Guild Lead',
    acharyaAvatar: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'faq-5',
    questionNumber: '05',
    category: 'Family Subscriptions',
    sanskrit: '॥ नित्य धर्म ॥',
    question: 'How does the monthly Nitya Puja subscription kit delivery work?',
    answer: 'Your custom consecrated puja samagri kit arrives at your doorstep before the start of every Shukla Paksha. Each box contains lab-pure samagri tailored for the upcoming month’s festivals, along with ritual cards and an astrological panchang almanac.',
    acharyaName: 'Acharya Vidyadhar Shastri',
    acharyaRole: 'Head of Agamic Consecration',
    acharyaAvatar: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Purity & Samagri', 'Luxury Yatras', 'Vedic Guidance', 'Artisan Co-Creation', 'Family Subscriptions'];

  const filteredFaqs = selectedCategory === 'All' 
    ? FAQS_DATA 
    : FAQS_DATA.filter(item => item.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section 
      id="faqs"
      className="relative w-full py-20 sm:py-28 bg-[#F7F1E5] text-[#8F6E5B] overflow-hidden select-none"
    >
      {/* Subtle Sacred Geometry Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8F6E5B 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none bg-[#B08A4A]/12" />
      <div className="absolute bottom-1/4 -left-24 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none bg-[#C7833D]/10" />

      {/* Background Sacred Pattern in Empty Margin (Matching Product Layout) */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-6 lg:right-2 xl:right-8 pointer-events-none opacity-55 hidden md:block">
        <DividerOrnamental size={460} color="#705B4C" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          {/* Eyebrow Inscription */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F6E5B]/10 border border-[#8F6E5B]/20 text-[#8F6E5B] text-xs font-dm font-bold tracking-widest uppercase mb-5 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#8F6E5B]" />
            <span>॥ प्रश्नोत्तर संवाद् ॥ &bull; SACRED INQUIRY &amp; ANSWERS</span>
          </div>

          {/* Main Title */}
          <h2 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-semibold text-[#8F6E5B] tracking-tight leading-[0.92] uppercase">
            FREQUENTLY ASKED
          </h2>
          <div className="mt-1 font-cormorant text-3xl sm:text-5xl md:text-6xl font-semibold text-[#8F6E5B] tracking-tight leading-[0.95] uppercase">
            SACRED QUESTIONS
          </div>

          <p className="mt-5 font-dm text-sm sm:text-base text-[#8F6E5B]/80 font-normal leading-relaxed">
            Direct dialogue between earnest seekers and our Vedic Acharyas regarding purity, luxury yatras, and dharmic co-creation.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-dm font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B08A4A] text-[#F7F1E5] shadow-md scale-105'
                    : 'bg-white border border-[#D9C6A8] text-[#8F6E5B]/80 hover:border-[#B08A4A] hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* FRAMER-STYLE DIALOGUE CHAT ACCORDION                     */}
        {/* Unique dual-avatar question (You) & answer (Acharya)     */}
        {/* ======================================================== */}
        <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <motion.div
                key={faq.id}
                layout
                className={`rounded-3xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? 'bg-white shadow-[0_16px_40px_rgba(51,44,37,0.08)] border-[#B08A4A]'
                    : 'bg-white/80 hover:bg-white border-[#D9C6A8]/60 hover:border-[#B08A4A]/60 shadow-xs'
                }`}
              >
                {/* ---------------------------------------------------- */}
                {/* QUESTION ROW (Devotee / Seeker Question Chat Bubble)  */}
                {/* ---------------------------------------------------- */}
                <div
                  onClick={() => toggleFAQ(faq.id)}
                  className="p-4 sm:p-6 cursor-pointer flex items-start sm:items-center gap-3 sm:gap-4 transition-colors select-none"
                >
                  {/* Left Avatar: "YOU" / Seeker Pill */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl shrink-0 bg-[#D9C6A8]/20 border border-[#D9C6A8] text-[#8F6E5B] flex flex-col items-center justify-center shadow-xs">
                    <span className="font-dm font-bold text-[10px] uppercase leading-none">YOU</span>
                    <span className="font-cormorant text-[10px] font-semibold text-[#B08A4A] leading-none mt-0.5">{faq.questionNumber}</span>
                  </div>

                  {/* Question Bubble & Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#66705A]/10 text-[#66705A] text-[10px] font-dm font-bold uppercase tracking-wider">
                        {faq.category}
                      </span>
                      <span className="text-xs font-sanskrit text-[#B08A4A] font-bold">
                        {faq.sanskrit}
                      </span>
                    </div>

                    <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-[#8F6E5B] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Expand / Collapse Icon Pill */}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs ${
                      isOpen 
                        ? 'bg-[#B08A4A] text-[#F7F1E5] rotate-180' 
                        : 'bg-[#D9C6A8]/20 text-[#8F6E5B] hover:bg-[#D9C6A8]/40 hover:text-[#B08A4A]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* ANSWER ROW (Light base with Colored Squared Bubble)  */}
                {/* ---------------------------------------------------- */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 26,
                        mass: 0.8
                      }}
                      className="overflow-hidden border-t border-stone-200/80 bg-[#FFFDF9]"
                    >
                      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white">
                        
                        {/* Acharya Response Chat Bubble - ONLY this squared layout gets rich vibrant color */}
                        <div className="flex-1 rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#C7833D] via-[#B08A4A] to-[#8F6A30] text-white border-2 border-[#D9C6A8]/60 shadow-[0_12px_32px_rgba(199,131,61,0.25)] relative">
                          {/* Chat bubble tail pointing to Acharya */}
                          <div className="hidden sm:block absolute -right-2 top-7 w-4 h-4 bg-[#B08A4A] border-t-2 border-r-2 border-[#D9C6A8]/60 rotate-45 transform" />

                          {/* Top Tag Pills */}
                          <div className="flex items-center justify-between gap-2 mb-3.5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs border border-white/30 text-xs font-dm font-bold text-white uppercase tracking-wider shadow-xs">
                              <Sparkles className="w-3.5 h-3.5 text-[#D9C6A8]" />
                              <span>Vedic Response &bull; House of Sanatan</span>
                            </div>
                            <span className="text-xs font-sanskrit text-white font-bold px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs border border-white/30 shadow-2xs">
                              {faq.sanskrit}
                            </span>
                          </div>

                          {/* Answer Body Text */}
                          <p className="font-dm text-sm sm:text-base text-white/95 leading-relaxed font-normal">
                            {faq.answer}
                          </p>

                          {/* Bottom Verification Footer */}
                          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-dm">
                            <span className="flex items-center gap-1.5 font-medium text-white">
                              <ShieldCheck className="w-4 h-4 text-[#D9C6A8]" />
                              <span>Peetham Verified &bull; Consecrated Guidance</span>
                            </span>
                          </div>
                        </div>

                        {/* Right Acharya Avatar Image & Title Badge (Clean, No Background) */}
                        <div className="flex sm:flex-col items-center sm:items-center gap-3 shrink-0 self-start sm:self-center sm:w-36 text-left sm:text-center pt-1 sm:pt-0">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[#B08A4A]/60 shadow-xs group bg-stone-100">
                            <img 
                              src={faq.acharyaAvatar} 
                              alt={faq.acharyaName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>

                          <div>
                            <h4 className="font-cormorant font-semibold text-base sm:text-lg text-[#8F6E5B] leading-tight">
                              {faq.acharyaName}
                            </h4>
                            <p className="font-dm text-[10px] text-[#66705A] font-medium leading-tight mt-0.5">
                              {faq.acharyaRole}
                            </p>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM HELP BANNER: ASK AN ACHARYA (FULLY COLOURED)      */}
        {/* ======================================================== */}
        <div className="mt-14 p-6 sm:p-9 rounded-3xl bg-gradient-to-r from-[#8F6E5B] via-[#7D5E4C] to-[#694D3D] border-2 border-[#B08A4A] shadow-[0_25px_60px_rgba(51,44,37,0.35)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left text-white relative overflow-hidden">
          
          {/* Subtle Golden Ambient Glow Inside Card */}
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#B08A4A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7833D] to-[#B08A4A] text-[#F7F1E5] flex items-center justify-center shrink-0 shadow-lg">
              <MessageSquareQuote className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-dm font-bold uppercase tracking-widest text-[#D9C6A8] mb-1">
                <Sparkles className="w-3 h-3" />
                <span>DIRECT ACHARYA DESK</span>
              </div>
              <h4 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#F7F1E5] leading-tight">
                Have a specific question about your family puja or Yatra?
              </h4>
              <p className="font-dm text-xs sm:text-sm text-[#D9C6A8]/90 mt-1 max-w-xl">
                Speak directly with our Peetham Vedic Acharyas on WhatsApp for personalized spiritual &amp; astrological guidance.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:brightness-110 text-[#F7F1E5] font-dm font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_25px_rgba(176,138,74,0.35)] hover:scale-105 transition-all duration-200 shrink-0 cursor-pointer relative z-10 border border-[#D9C6A8]/40"
          >
            <span>Ask an Acharya</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
