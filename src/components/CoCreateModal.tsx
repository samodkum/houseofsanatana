import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Hammer, Palette, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

interface CoCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const CoCreateModal: React.FC<CoCreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('artisan');
  const [portfolio, setPortfolio] = useState('');
  const [pitch, setPitch] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(`Pranam ${name || 'Artisan'}! Your Co-Creation portfolio has been received by our curators.`);
      setSubmitted(false);
      setName('');
      setEmail('');
      setPortfolio('');
      setPitch('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#8F6E5B]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#F7F1E5] border border-[#B08A4A]/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(51,44,37,0.3),_0_0_40px_rgba(176,138,74,0.15)] text-[#8F6E5B] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#66705A]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#8F6E5B]/5 hover:bg-[#8F6E5B]/10 text-[#8F6E5B]/70 hover:text-[#8F6E5B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#66705A]/20 to-[#B08A4A]/20 border border-[#66705A]/40 text-[#66705A]">
            <Hammer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-dm font-semibold tracking-[0.25em] text-[#66705A] uppercase block">
              ॥ सह-सर्जनम् ॥ &bull; SACRED CO-CREATION
            </span>
            <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8F6E5B]">
              Build with House of Sanatan
            </h2>
          </div>
        </div>

        <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mb-6 leading-relaxed">
          Are you a traditional shilpi (sculptor), Sanskrit scholar, sacred musician, organic incense alchemist, or temple architect? Partner with us to preserve and elevate Sanatan Dharma.
        </p>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-[#66705A] mb-4 animate-bounce" />
            <h3 className="font-cormorant text-2xl font-semibold text-[#8F6E5B] mb-2">Proposal Submitted</h3>
            <p className="font-dm text-sm text-[#8F6E5B]/70">Our curatorial acharyas will review your craft within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-dm font-medium text-[#8F6E5B] uppercase tracking-wider mb-1.5">
                  Name / Guild
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sompura Shilp Arts"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D9C6A8] text-[#8F6E5B] placeholder-[#8F6E5B]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-dm font-medium text-[#8F6E5B] uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="studio@sanatan.org"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D9C6A8] text-[#8F6E5B] placeholder-[#8F6E5B]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-dm font-medium text-[#8F6E5B] uppercase tracking-wider mb-1.5">
                  Discipline
                </label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D9C6A8] text-[#8F6E5B] text-sm font-dm focus:outline-none focus:border-[#66705A] transition-colors"
                >
                  <option value="artisan" className="bg-[#F7F1E5]">Shilpa & Vigraha Artisan</option>
                  <option value="scholar" className="bg-[#F7F1E5]">Vedic Literature & Sanskrit</option>
                  <option value="music" className="bg-[#F7F1E5]">Sacred Dhrupad / Stotra Audio</option>
                  <option value="fragrance" className="bg-[#F7F1E5]">Pure Dhoop & Ayurvedic Botanicals</option>
                  <option value="architecture" className="bg-[#F7F1E5]">Vastu & Mandir Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-dm font-medium text-[#8F6E5B] uppercase tracking-wider mb-1.5">
                  Link / Portfolio (optional)
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D9C6A8] text-[#8F6E5B] placeholder-[#8F6E5B]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-dm font-medium text-[#8F6E5B] uppercase tracking-wider mb-1.5">
                Brief Vision & Sacred Craft
              </label>
              <textarea
                required
                rows={3}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Describe your craft, materials used, lineage or what you'd like to co-create with us..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#D9C6A8] text-[#8F6E5B] placeholder-[#8F6E5B]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#66705A] via-[#B08A4A] to-[#66705A] hover:opacity-90 text-[#F7F1E5] font-dm font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(102,112,90,0.3)] cursor-pointer"
              >
                <span>Submit Collaboration Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-dm text-[#8F6E5B]/70 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66705A]" />
              <span>Fair trade royalties &bull; Complete copyright honor guaranteed</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
