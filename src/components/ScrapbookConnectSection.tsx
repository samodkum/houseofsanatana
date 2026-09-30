import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Heart, ArrowUpRight } from 'lucide-react';

interface ScrapbookConnectSectionProps {
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
}

export const ScrapbookConnectSection: React.FC<ScrapbookConnectSectionProps> = ({
  onNavigateHome,
  onNavigateAbout
}) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'home' | 'about' | 'subscribe'>('contact');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactModalOpen(false);
      setEmailInput('');
      setMessageInput('');
      setNameInput('');
    }, 2400);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8E7] py-16 sm:py-24 px-4 sm:px-8 select-none">
      
      {/* Subtle paper grain texture pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#D6CEBE 0.75px, transparent 0.75px), radial-gradient(#D6CEBE 0.75px, #FFF8E7 0.75px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px'
        }}
      />

      <div className="relative max-w-6xl mx-auto min-h-[520px] sm:min-h-[580px] flex flex-col justify-between">
        
        {/* ======================================================== */}
        {/* 2. MAIN EDITORIAL CONTENT: "let's connect"               */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8 sm:mt-12">
          
          {/* Left Column Spacer for Corner Collage */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* Right Column: Editorial Text & Action */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pl-10 z-20 max-w-xl">
            
            {/* Title: "let's connect" in elegant lowercase serif */}
            <h2 className="font-cormorant text-5xl sm:text-6xl md:text-[68px] font-light text-[#1F1B18] tracking-tight leading-[1.05] mb-5">
              let's connect
            </h2>

            {/* Conversational editorial paragraph */}
            <p className="font-dm text-xs sm:text-[13px] md:text-sm text-[#4A423B] leading-relaxed max-w-lg mb-6">
              We don't just believe in the art of travelling and recording, but collecting,
              personalising, making something count and making something truly yours.
              We stand by our values — connect with us to collaborate, share archival discoveries, or craft your journey.
            </p>

            {/* Pill "contact" button */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="py-1.5 px-6 rounded-full border border-[#3A332C]/40 hover:border-[#1A1612] bg-transparent hover:bg-[#1A1612] text-[#3A332C] hover:text-white font-dm text-xs sm:text-[13px] transition-all duration-300 cursor-pointer active:scale-95 shadow-2xs"
            >
              contact
            </button>

          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. CORNER COLLAGE EPHEMERA (Manila folder & Polaroids)   */}
        {/*    Anchored directly to bottom-left corner               */}
        {/* ======================================================== */}
        <div className="relative lg:absolute lg:left-[-2%] lg:bottom-[-40px] w-full lg:w-[540px] h-[340px] sm:h-[380px] pointer-events-auto mt-10 lg:mt-0 select-none">
          
          {/* Base: Tilted Manila Folder */}
          <div className="absolute left-[-20px] sm:left-[-10px] bottom-[-20px] w-[340px] sm:w-[410px] h-[260px] sm:h-[300px] bg-[#EEDFB8] rounded-2xl rounded-tr-[50px] shadow-[0_20px_50px_rgba(70,55,30,0.18)] border border-[#DEC99B] transform -rotate-12 transition-transform duration-500 hover:-rotate-10 origin-bottom-left">
            {/* Folder Tab */}
            <div className="absolute top-[-18px] left-8 w-28 sm:w-34 h-6 bg-[#EEDFB8] rounded-t-lg border-t border-l border-r border-[#DEC99B] flex items-center px-3">
              <span className="font-script text-xs sm:text-sm text-[#7D6B4E] tracking-wider">
                archives • 2026
              </span>
            </div>
            {/* Inner folder texture line */}
            <div className="absolute inset-x-4 top-4 bottom-4 border border-dashed border-[#DECCA0]/60 rounded-xl pointer-events-none" />
          </div>

          {/* Item A: Far Left Stamp/Postcard with Flower (France / Lotus stamp in reference) */}
          <div className="absolute left-[2%] sm:left-[4%] bottom-[40px] sm:bottom-[60px] w-20 sm:w-26 h-28 sm:h-36 rounded-md overflow-hidden bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.16)] border border-stone-200 transform -rotate-16 transition-transform duration-300 hover:scale-108 hover:z-30">
            <div className="w-full h-full border border-dashed border-stone-300 rounded overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80"
                alt="Botanical Stamp"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 bg-black/50 px-1 rounded text-[8px] text-white font-mono">
                25P
              </div>
            </div>
          </div>

          {/* Item B: Upper Left Polaroid (Girl with hat / Yatra pilgrim) */}
          <div className="absolute left-[16%] sm:left-[18%] bottom-[130px] sm:bottom-[160px] w-24 sm:w-30 bg-white p-1.5 pb-6 rounded shadow-[0_12px_28px_rgba(0,0,0,0.16)] border border-stone-200 transform -rotate-8 transition-transform duration-300 hover:scale-108 hover:z-30">
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80"
                alt="Sacred Pilgrim"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1 text-center">
              <span className="font-script text-[11px] text-stone-600">pilgrim</span>
            </div>
          </div>

          {/* Item C: Central Large Polaroid (Cherry Blossoms / Temple Flowers) with Paperclip! */}
          <div className="absolute left-[24%] sm:left-[27%] bottom-[35px] sm:bottom-[50px] w-48 sm:w-58 bg-[#FBF9F5] p-2 sm:p-2.5 pb-7 sm:pb-9 rounded-md shadow-[0_16px_38px_rgba(0,0,0,0.22)] border border-[#E3DC CE] transform -rotate-3 transition-transform duration-300 hover:scale-105 hover:z-30 z-20">
            
            {/* METALLIC PAPERCLIP at top-left corner */}
            <div className="absolute -top-3.5 left-4 z-30 pointer-events-none drop-shadow-sm">
              <svg width="22" height="38" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M7 10 V26 C7 31 17 31 17 26 V6 C17 1 3 1 3 6 V27 C3 34 21 34 21 27 V10" 
                  stroke="#8B9196" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200 rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80"
                alt="Spring in Blossom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between px-1">
              <span className="font-script text-xs sm:text-sm text-stone-700">kashi darshan</span>
              <span className="font-mono text-[9px] text-stone-400">#042</span>
            </div>
          </div>

          {/* Item D: Japanese / Sanskrit Postal Stamp Sheet below Polaroid */}
          <div className="absolute left-[20%] sm:left-[22%] bottom-[0px] w-36 sm:w-44 h-22 sm:h-26 bg-[#F4EFE6] rounded p-1 shadow-md border border-[#D5CABB] transform rotate-3 overflow-hidden z-10">
            <div className="grid grid-cols-4 gap-1 w-full h-full opacity-85">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80" alt="st" className="w-full h-full object-cover" />
              <img src="https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=150&q=80" alt="st" className="w-full h-full object-cover" />
              <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=150&q=80" alt="st" className="w-full h-full object-cover" />
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=150&q=80" alt="st" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Item E: Red Postage Stamp (Statue of Liberty / Sacred Deity Stamp in reference) */}
          <div className="absolute left-[44%] sm:left-[48%] bottom-[-8px] sm:bottom-[-5px] w-18 sm:w-22 h-24 sm:h-28 bg-[#9E2A2B] rounded-sm p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.2)] border-2 border-white transform rotate-6 z-30 transition-transform duration-300 hover:scale-110">
            <div className="w-full h-full border border-white/60 p-0.5 flex flex-col justify-between items-center text-center">
              <span className="font-mono text-[7px] text-white/90 tracking-widest uppercase">
                SANATAN DAK
              </span>
              <img 
                src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=200&q=80" 
                alt="Stamp"
                className="w-10 h-10 object-cover rounded-xs"
              />
              <span className="font-serif text-[10px] font-bold text-white leading-none">
                11¢
              </span>
            </div>
          </div>

          {/* Item F: Right Postcard with Masking Tape (Torii Gate / Japan Mount Fuji in reference) */}
          <div className="absolute left-[54%] sm:left-[60%] bottom-[10px] sm:bottom-[20px] w-48 sm:w-56 bg-[#F5EEDB] p-2.5 sm:p-3 rounded-sm shadow-[0_14px_34px_rgba(0,0,0,0.18)] border border-[#DECDB3] transform rotate-2 z-20">
            
            {/* TRANSLUCENT WASHI TAPE at top edge */}
            <div className="absolute -top-3 left-1/3 -translate-x-1/2 w-16 sm:w-20 h-5 bg-white/75 backdrop-blur-[2px] shadow-xs border-y border-stone-300/40 transform -rotate-2 pointer-events-none mix-blend-screen opacity-90" />

            <div className="flex gap-2.5 items-start">
              {/* Little Torii gate / Mandir photo */}
              <div className="w-16 sm:w-20 aspect-[3/4] bg-white p-1 rounded shadow-xs shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80"
                  alt="Torii Gate"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Handwritten postcard side with Rubber Stamp */}
              <div className="flex-1 flex flex-col justify-between h-22 sm:h-26 py-0.5">
                <div className="flex items-start justify-between">
                  <span className="font-script text-[11px] sm:text-xs text-[#8F7453]">april 2026</span>
                  
                  {/* Rubber Stamp mark ("JAPAN Mount Fuji" style) */}
                  <div className="border border-[#A8423F] rounded px-1 py-0.5 text-center transform -rotate-3 bg-[#FAF3E8]/80">
                    <span className="font-mono text-[7px] text-[#A8423F] font-bold block uppercase leading-none">
                      BHARAT
                    </span>
                    <span className="font-mono text-[6px] text-[#A8423F] block leading-none mt-0.5">
                      KASHI DHAM
                    </span>
                  </div>
                </div>

                {/* Script cancellation / postal lines */}
                <div className="space-y-1 my-1">
                  <div className="h-[1px] w-full bg-[#D6C4AA]" />
                  <div className="h-[1px] w-3/4 bg-[#D6C4AA]" />
                </div>

                {/* Japanese / Sanskrit calligraphy note */}
                <span className="font-sanskrit text-[10px] text-[#63533E] line-clamp-1">
                  ॥ सत्यमेव जयते नानृतम् ॥
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE CONTACT MODAL                             */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-[#FAF7F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D9CDB8] text-[#1A1612]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-200/80 hover:bg-[#1A1612] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="font-script text-2xl text-[#E05244] block">
                  Write to House of Sanatan
                </span>
                <h3 className="font-cormorant text-3xl font-light text-[#1F1B18] tracking-tight">
                  let's connect
                </h3>
                <p className="font-dm text-xs text-stone-600 mt-1">
                  Whether sharing an ancient manuscript, inquiring about sacred yatras, or exploring collaborations.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-cormorant text-2xl font-bold text-[#1A1612]">
                    Message Received
                  </h4>
                  <p className="font-dm text-xs text-stone-600 max-w-xs mx-auto">
                    Thank you for connecting with us. Our archivist team will reply with reverence shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-dm text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs font-dm text-[#1A1612] focus:outline-none focus:border-[#1A1612]"
                    />
                  </div>

                  <div>
                    <label className="block font-dm text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs font-dm text-[#1A1612] focus:outline-none focus:border-[#1A1612]"
                    />
                  </div>

                  <div>
                    <label className="block font-dm text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Your Sacred Inquiry / Note
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Share what's on your mind or what you wish to create..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9CDB8] text-xs font-dm text-[#1A1612] focus:outline-none focus:border-[#1A1612]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-script text-base text-stone-500">
                      namaste &amp; gratitude
                    </span>
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-full bg-[#1A1612] hover:bg-[#332A22] text-white font-dm text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <span>Send Note</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
