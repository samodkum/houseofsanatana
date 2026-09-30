import React, { useState } from 'react';
import { YatraPackage } from '../types/homepage';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Send, Sparkles, User, Phone, Mail } from 'lucide-react';

interface YatraModalProps {
  yatra: YatraPackage | null;
  onClose: () => void;
}

export const YatraModal: React.FC<YatraModalProps> = ({ yatra, onClose }) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'book'>('itinerary');
  const [selectedBatch, setSelectedBatch] = useState<string>(yatra?.nextBatches[0] || '');
  const [pilgrimCount, setPilgrimCount] = useState<number>(2);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', specialRequests: '' });

  if (!yatra) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#8F6E5B]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#F7F1E5] border border-[#B08A4A]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(143,110,91,0.3)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#C7833D]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#8F6E5B]/5 border border-[#D9C6A8] text-[#8F6E5B] hover:text-[#8F6E5B] hover:border-[#B08A4A] flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#D9C6A8]/30 border border-[#B08A4A]/40 text-[#C7833D] text-xs font-dm font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
              <span>Spiritual Yatra Expedition</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#D9C6A8]/20 text-[#66705A] text-xs font-dm flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#B08A4A]" />
              <span>{yatra.durationDays} Days / {yatra.durationNights} Nights</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#D9C6A8]/20 text-[#66705A] text-xs font-dm flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#B08A4A]" />
              <span>Starts at {yatra.startLocation}</span>
            </span>
          </div>
          <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8F6E5B]">
            {yatra.title}
          </h3>
          <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mt-1 font-normal">
            {yatra.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D9C6A8] mb-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 px-4 text-xs font-dm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-[#C7833D] text-[#C7833D]'
                : 'border-transparent text-[#8F6E5B]/70 hover:text-[#8F6E5B]'
            }`}
          >
            Day-By-Day Itinerary ({yatra.itinerary.length} Days)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 px-4 text-xs font-dm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-[#C7833D] text-[#C7833D]'
                : 'border-transparent text-[#8F6E5B]/70 hover:text-[#8F6E5B]'
            }`}
          >
            Inclusions & VIP Perks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={`pb-3 px-4 text-xs font-dm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'border-[#C7833D] text-[#C7833D]'
                : 'border-transparent text-[#8F6E5B]/70 hover:text-[#8F6E5B]'
            }`}
          >
            Reserve / Enquire Pass
          </button>
        </div>

        {/* Tab 1: Itinerary */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
            {yatra.itinerary.map((day) => (
              <div 
                key={day.day}
                className="p-4 rounded-2xl bg-white/80 border border-[#D9C6A8] flex flex-col sm:flex-row gap-3 sm:gap-4 items-start shadow-xs"
              >
                <div className="px-3 py-1.5 rounded-xl bg-[#D9C6A8]/25 border border-[#D9C6A8] text-[#C7833D] font-cormorant font-semibold text-sm shrink-0 whitespace-nowrap">
                  Day 0{day.day}
                </div>
                <div className="flex-1">
                  <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B]">
                    {day.title}
                  </h4>
                  <p className="mt-1 font-dm text-xs text-[#8F6E5B]/75 leading-relaxed font-normal">
                    {day.description}
                  </p>
                  <div className="mt-2 text-[11px] font-dm text-[#C7833D] flex items-center gap-1.5 font-medium">
                    <span className="text-[#8F6E5B]/60">Overnight:</span>
                    <span>{day.stay}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Inclusions & Highlights */}
        {activeTab === 'inclusions' && (
          <div className="space-y-6 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
            <div>
              <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B] mb-3 uppercase tracking-wider">
                Key Spiritual Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yatra.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/80 border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B]/85 flex items-start gap-2 shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#B08A4A] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B] mb-3 uppercase tracking-wider">
                Full Package Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yatra.inclusions.map((inc, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/80 border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B]/85 flex items-center gap-2 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#66705A] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#D9C6A8]/25 border border-[#D9C6A8] flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#B08A4A] shrink-0" />
              <p className="text-xs font-dm text-[#8F6E5B]/80 font-normal">
                <strong className="text-[#C7833D] font-semibold">Elderly & Family Friendly Guarantee:</strong> Medical support on standby, luggage porter assistance, and wheelchair accessibility tokens arranged wherever available.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Booking Form */}
        {activeTab === 'book' && (
          <div className="max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
            {enquirySubmitted ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-white/80 border border-[#66705A]/40 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-[#66705A]/15 text-[#66705A] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-cormorant text-2xl font-semibold text-[#8F6E5B]">
                  Spiritual Sankalpa Received
                </h4>
                <p className="mt-2 font-dm text-sm text-[#8F6E5B]/80 max-w-md mx-auto">
                  Thank you, <strong className="text-[#C7833D]">{formData.name || 'Devotee'}</strong>. Our dedicated Yatra Concierge Acharya will reach out within 4 hours with your confirmed VIP token itinerary and travel guidelines.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] text-[#F7F1E5] font-dm font-semibold text-xs uppercase tracking-wider shadow-md"
                  >
                    Return to Offerings
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Batch selection */}
                <div>
                  <label className="block text-xs font-dm font-semibold text-[#8F6E5B] uppercase mb-1.5">
                    Select Departure Batch Date
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {yatra.nextBatches.map((batch, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedBatch(batch)}
                        className={`p-2.5 rounded-xl text-xs font-dm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                          selectedBatch === batch
                            ? 'bg-[#D9C6A8]/30 border-[#C7833D] text-[#C7833D] font-bold shadow-xs'
                            : 'bg-white/80 border-[#D9C6A8] text-[#8F6E5B]/75 hover:border-[#B08A4A]'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#B08A4A]" />
                        <span>{batch}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-dm text-[#8F6E5B]/85 font-medium mb-1">
                      Full Name of Primary Pilgrim *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8F6E5B]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Chandra Sharma"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 border border-[#D9C6A8] focus:border-[#C7833D] text-sm text-[#8F6E5B] outline-none font-dm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-dm text-[#8F6E5B]/85 font-medium mb-1">
                      WhatsApp / Mobile Contact *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8F6E5B]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 border border-[#D9C6A8] focus:border-[#C7833D] text-sm text-[#8F6E5B] outline-none font-dm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-dm text-[#8F6E5B]/85 font-medium mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8F6E5B]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 border border-[#D9C6A8] focus:border-[#C7833D] text-sm text-[#8F6E5B] outline-none font-dm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-dm text-[#8F6E5B]/85 font-medium mb-1">
                      Number of Devotees (Pilgrims)
                    </label>
                    <select
                      value={pilgrimCount}
                      onChange={(e) => setPilgrimCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/80 border border-[#D9C6A8] focus:border-[#C7833D] text-sm text-[#8F6E5B] outline-none font-dm"
                    >
                      {[1, 2, 3, 4, 5, 6, '7+ (Custom Group)'].map((count, i) => (
                        <option key={i} value={count} className="bg-[#F7F1E5]">
                          {count} {typeof count === 'number' && count > 1 ? 'Devotees' : typeof count === 'number' ? 'Devotee' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-dm text-[#8F6E5B]/85 font-medium mb-1">
                    Special Inquiries / Senior Citizen / Helicopter Requests
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. My mother is 74 and requires wheelchair/pony assistance at temple stairs."
                    className="w-full px-3 py-2 rounded-xl bg-white/80 border border-[#D9C6A8] focus:border-[#C7833D] text-xs text-[#8F6E5B] outline-none font-dm resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D9C6A8]">
                  <div className="text-left">
                    <span className="text-xs text-[#8F6E5B]/70 font-dm block">Estimated Sacred Cost</span>
                    <span className="font-cormorant text-2xl font-semibold text-[#C7833D]">
                      ₹{(yatra.pricePerPerson * (typeof pilgrimCount === 'number' ? pilgrimCount : 1)).toLocaleString()}
                    </span>
                    <span className="text-[11px] font-dm text-[#8F6E5B]/60 ml-2">
                      (All inclusions & VIP passes covered)
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#C7833D] text-[#F7F1E5] font-dm font-semibold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Reservation Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
