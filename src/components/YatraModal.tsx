import React, { useState } from 'react';
import { YatraPackage } from '../types/homepage';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Send, Sparkles, User, Phone, Mail, ShoppingBag, Loader2 } from 'lucide-react';
import { createTravelShopifyCheckout } from '../lib/shopify';

interface YatraModalProps {
  yatra: YatraPackage | null;
  onClose: () => void;
}

export const YatraModal: React.FC<YatraModalProps> = ({ yatra, onClose }) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'book'>('itinerary');
  const [selectedBatch, setSelectedBatch] = useState<string>(yatra?.nextBatches[0] || '');
  const [pilgrimCount, setPilgrimCount] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', specialRequests: '' });

  if (!yatra) return null;

  const handleShopifyCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('Please fill in your name, contact phone and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const checkoutUrl = await createTravelShopifyCheckout({
        packageTitle: yatra.title,
        packageId: yatra.id,
        departureDate: selectedBatch || yatra.nextBatches[0] || 'Upcoming Sacred Muhurat',
        pilgrimCount: typeof pilgrimCount === 'number' ? pilgrimCount : 1,
        contactName: formData.name.trim(),
        contactPhone: formData.phone.trim(),
        contactEmail: formData.email.trim(),
        specialRequests: formData.specialRequests.trim(),
        pricePerPerson: yatra.pricePerPerson,
        circuit: yatra.circuit,
      });

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Could not start checkout. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#221508]/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#FEFBF2] border-2 border-[#C59239]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(34,21,8,0.25)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#0A4C83]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#221508]/5 border border-[#C59239]/40 text-[#221508] hover:text-[#FE7613] hover:border-[#FE7613] flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#C59239]/15 border border-[#C59239]/40 text-[#C59239] text-xs font-dm font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FE7613]" />
              <span>Spiritual Yatra Expedition</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0A4C83]/10 text-[#0A4C83] text-xs font-dm flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#0A4C83]" />
              <span>{yatra.durationDays} Days / {yatra.durationNights} Nights</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#607427]/10 text-[#607427] text-xs font-dm flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#607427]" />
              <span>Starts at {yatra.startLocation}</span>
            </span>
          </div>
          <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
            {yatra.title}
          </h3>
          <p className="font-dm text-xs sm:text-sm text-[#3D2619]/80 mt-1 font-normal">
            {yatra.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#C59239]/30 mb-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 px-4 text-xs font-dm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-[#0A4C83] text-[#0A4C83]'
                : 'border-transparent text-[#3D2619]/70 hover:text-[#221508]'
            }`}
          >
            Day-By-Day Itinerary ({yatra.itinerary.length} Days)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 px-4 text-xs font-dm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-[#0A4C83] text-[#0A4C83]'
                : 'border-transparent text-[#3D2619]/70 hover:text-[#221508]'
            }`}
          >
            Inclusions & VIP Perks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={`pb-3 px-4 text-xs font-dm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'border-[#0A4C83] text-[#0A4C83]'
                : 'border-transparent text-[#3D2619]/70 hover:text-[#221508]'
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
                className="p-4 rounded-2xl bg-white border border-[#C59239]/30 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start shadow-xs"
              >
                <div className="px-3 py-1.5 rounded-xl bg-[#0A4C83]/10 border border-[#0A4C83]/30 text-[#0A4C83] font-dm font-bold text-xs shrink-0 whitespace-nowrap">
                  Day 0{day.day}
                </div>
                <div className="flex-1">
                  <h4 className="font-cormorant text-base font-bold text-[#221508]">
                    {day.title}
                  </h4>
                  <p className="mt-1 font-dm text-xs text-[#3D2619]/75 leading-relaxed font-normal">
                    {day.description}
                  </p>
                  <div className="mt-2 text-[11px] font-dm text-[#FE7613] flex items-center gap-1.5 font-medium">
                    <span className="text-[#3D2619]/60">Overnight:</span>
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
              <h4 className="font-cormorant text-base font-bold text-[#221508] mb-3 uppercase tracking-wider">
                Key Spiritual Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yatra.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-[#C59239]/30 text-xs font-dm text-[#3D2619]/90 flex items-start gap-2 shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#FE7613] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-cormorant text-base font-bold text-[#221508] mb-3 uppercase tracking-wider">
                Full Package Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yatra.inclusions.map((inc, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-[#C59239]/30 text-xs font-dm text-[#3D2619]/90 flex items-start gap-2 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#607427] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#C59239]/30 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#607427] shrink-0" />
              <p className="text-xs font-dm text-[#3D2619]/80 font-normal">
                <strong className="text-[#0A4C83] font-semibold">Elderly & Family Friendly Guarantee:</strong> Medical support on standby, luggage porter assistance, and wheelchair accessibility tokens arranged wherever available.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Booking Form */}
        {activeTab === 'book' && (
          <div className="max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
            <form onSubmit={handleShopifyCheckout} className="space-y-4">
              {/* Batch selection */}
              <div>
                <label className="block text-xs font-dm font-semibold text-[#221508] uppercase mb-1.5">
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
                            ? 'bg-[#0A4C83] text-white font-bold shadow-xs border-[#0A4C83]'
                            : 'bg-white border-[#C59239]/30 text-[#3D2619] hover:border-[#0A4C83]'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#E4B968]" />
                        <span>{batch}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-dm text-[#3D2619] font-medium mb-1">
                      Full Name of Primary Pilgrim *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#3D2619]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Chandra Sharma"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-dm text-[#3D2619] font-medium mb-1">
                      WhatsApp / Mobile Contact *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#3D2619]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-dm text-[#3D2619] font-medium mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#3D2619]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-dm text-[#3D2619] font-medium mb-1">
                      Number of Devotees (Pilgrims)
                    </label>
                    <select
                      value={pilgrimCount}
                      onChange={(e) => setPilgrimCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                    >
                      {[1, 2, 3, 4, 5, 6, '7+ (Custom Group)'].map((count, i) => (
                        <option key={i} value={count} className="bg-[#FEFBF2]">
                          {count} {typeof count === 'number' && count > 1 ? 'Devotees' : typeof count === 'number' ? 'Devotee' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-dm text-[#3D2619] font-medium mb-1">
                    Special Inquiries / Senior Citizen / Helicopter Requests
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. My mother is 74 and requires wheelchair/pony assistance at temple stairs."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-xs text-[#221508] outline-none font-dm resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C59239]/30">
                  <div className="text-left">
                    <span className="text-xs text-[#3D2619]/70 font-dm block">Estimated Sacred Cost</span>
                    <span className="font-cormorant text-2xl font-bold text-[#FE7613]">
                      ₹{(yatra.pricePerPerson * (typeof pilgrimCount === 'number' ? pilgrimCount : 1)).toLocaleString()}
                    </span>
                    <span className="text-[11px] font-dm text-[#3D2619]/60 ml-2">
                      (All inclusions & VIP passes covered)
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#FE7613] via-[#FE8D3B] to-[#FE7613] hover:brightness-105 text-white font-dm font-semibold text-xs uppercase tracking-wider shadow-md shadow-[#FE7613]/25 cursor-pointer transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting to Sacred Checkout...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Proceed to Sacred Checkout</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
          </div>
        )}

      </div>
    </div>
  );
};
