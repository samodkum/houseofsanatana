import React, { useState } from 'react';
import { X, Users, Sparkles, CheckCircle2, HeartHandshake, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('daily-satsang');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(`Welcome to the Sacred Sangha, ${name || 'seeker'}! Check your email for initiation details.`);
      setSubmitted(false);
      setName('');
      setEmail('');
      setCity('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#FEFBF2] border border-[#C59239]/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(34,21,8,0.35),_0_0_40px_rgba(10,76,131,0.15)] text-[#221508] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#0A4C83]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#221508]/5 hover:bg-[#221508]/10 text-[#221508]/70 hover:text-[#221508] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A4C83]/20 to-[#C59239]/20 border border-[#0A4C83]/40 text-[#0A4C83]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-dm font-semibold tracking-[0.25em] text-[#0A4C83] uppercase block">
              ॥ सनातन संघ ॥ &bull; SACRED SANGHA
            </span>
            <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
              Join the Global Circle
            </h2>
          </div>
        </div>

        <p className="font-dm text-xs sm:text-sm text-[#3D2619]/80 mb-6 leading-relaxed">
          Become part of a consecrated fraternity of truth-seekers. Gain access to daily sunrise Brahma Muhurta meditation, live Kashi & Tirupati darshans, and local chapter meets.
        </p>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-[#607427] mb-4 animate-bounce" />
            <h3 className="font-cormorant text-2xl font-semibold text-[#221508] mb-2">Welcome to the Sangha</h3>
            <p className="font-dm text-sm text-[#3D2619]/70">Preparing your consecrated portal invite...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-dm font-medium text-[#221508] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#C59239]/30 text-[#221508] placeholder-[#3D2619]/40 text-sm font-dm focus:outline-none focus:border-[#0A4C83] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-dm font-medium text-[#221508] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#C59239]/30 text-[#221508] placeholder-[#3D2619]/40 text-sm font-dm focus:outline-none focus:border-[#0A4C83] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-dm font-medium text-[#221508] uppercase tracking-wider mb-1.5">
                  City / Location
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Varanasi, London"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#C59239]/30 text-[#221508] placeholder-[#3D2619]/40 text-sm font-dm focus:outline-none focus:border-[#0A4C83] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-dm font-medium text-[#221508] uppercase tracking-wider mb-1.5">
                  Primary Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#C59239]/30 text-[#221508] text-sm font-dm focus:outline-none focus:border-[#0A4C83] transition-colors"
                >
                  <option value="daily-satsang">Daily Virtual Satsang</option>
                  <option value="darshan">Live Temple Darshans</option>
                  <option value="youth-circle">Youth Dharmic Forum</option>
                  <option value="seva">Ghat & Mandir Seva</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0A4C83] via-[#3DB3E4] to-[#0A4C83] hover:brightness-110 text-white font-dm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(10,76,131,0.35)] cursor-pointer"
              >
                <span>Complete Sacred Initiation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-dm text-[#3D2619]/70 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#607427]" />
              <span>Free lifelong membership &bull; Consecrated privacy guaranteed</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
