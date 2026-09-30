import React from 'react';
import { Compass, MapPin, Calendar, Users, ShieldCheck, ExternalLink, Sparkles, PhoneCall } from 'lucide-react';
import { CustomerOrderNode } from '../hooks/useCustomer';

export interface YatraBooking {
  id: string;
  orderName: string;
  yatraTitle: string;
  destination: string;
  duration: string;
  dates: string;
  passengers: number;
  totalPrice: { amount: string; currencyCode: string };
  status: 'Confirmed' | 'Completed' | 'Upcoming';
  inclusions: string[];
}

interface YatrasPanelProps {
  yatras?: YatraBooking[];
  isLoading?: boolean;
  onExploreYatras?: () => void;
}

export const SAMPLE_YATRAS: YatraBooking[] = [
  {
    id: 'yatra-1',
    orderName: '#HOS-YTR-0994',
    yatraTitle: 'Char Dham Himalayan Sacred Pilgrimage',
    destination: 'Yamunotri • Gangotri • Kedarnath • Badrinath',
    duration: '10 Days • 9 Nights',
    dates: '18 May 2026 – 27 May 2026',
    passengers: 2,
    totalPrice: { amount: '35000.00', currencyCode: 'INR' },
    status: 'Confirmed',
    inclusions: ['VIP Sanctum Darshan', 'Consecrated Satvik Meals', 'Vedic Priest & Guide', 'Sacred Bhasma Offering']
  },
  {
    id: 'yatra-2',
    orderName: '#HOS-YTR-0841',
    yatraTitle: 'Kashi Vishwanath & Ganga Aarti Divine Sanctum',
    destination: 'Varanasi (Kashi), Uttar Pradesh',
    duration: '4 Days • 3 Nights',
    dates: '12 Nov 2025 – 15 Nov 2025',
    passengers: 1,
    totalPrice: { amount: '14500.00', currencyCode: 'INR' },
    status: 'Completed',
    inclusions: ['Subah-e-Banaras Boat Darshan', 'Maha Aarti Sanctum Entry', 'Temple Guest House']
  }
];

export const YatrasPanel: React.FC<YatrasPanelProps> = ({
  yatras = SAMPLE_YATRAS,
  isLoading,
  onExploreYatras,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-[#D9C6A8]/30 rounded-lg w-48"></div>
        <div className="h-4 bg-[#D9C6A8]/20 rounded-md w-72"></div>
        <div className="mt-8 space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-48 bg-[#FFFFFF] border border-[#D9C6A8]/40 rounded-2xl p-6"></div>
          ))}
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: string, currencyCode: string) => {
    try {
      const num = parseFloat(amount);
      if (currencyCode === 'INR') {
        return `₹${num.toLocaleString('en-IN')}`;
      }
      return `${currencyCode} ${num.toFixed(2)}`;
    } catch {
      return `${currencyCode} ${amount}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#D9C6A8]/40 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C7833D] font-dm text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Expeditions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#332C25] font-normal tracking-wide">
            Your Travel Packages & Yatras
          </h2>
          <p className="text-sm text-[#8F6E5B] font-dm mt-1">
            Manage your booked Himalayan expeditions, temple darshan passes, and sacred pilgrimages.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E5] border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B]">
          <Compass className="w-3.5 h-3.5 text-[#C7833D]" />
          <span>{yatras.length} {yatras.length === 1 ? 'Package' : 'Packages'} Booked</span>
        </div>
      </div>

      {/* Yatra Cards */}
      {yatras.length === 0 ? (
        <div className="text-center py-16 px-6 bg-[#FFFFFF] border border-[#D9C6A8]/50 rounded-2xl shadow-[0_4px_20px_rgba(143,110,91,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#F7F1E5] border border-[#D9C6A8] flex items-center justify-center mx-auto mb-4 text-[#C7833D]">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif text-[#332C25] mb-2">No Sacred Yatras Booked Yet</h3>
          <p className="text-sm text-[#8F6E5B] max-w-md mx-auto mb-6 font-dm">
            Embark on a transformative spiritual pilgrimage to sacred Himalayan dhams and holy river sanctums.
          </p>
          <a
            href="#travel"
            onClick={onExploreYatras}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-[#F7F1E5] font-dm text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <span>Explore Sacred Yatras</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {yatras.map((yatra) => {
            const isConfirmed = yatra.status === 'Confirmed';
            const isCompleted = yatra.status === 'Completed';

            return (
              <div
                key={yatra.id}
                className="bg-[#FFFFFF] border border-[#D9C6A8]/70 hover:border-[#C7833D]/70 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(51,44,37,0.05)] transition-all duration-300 space-y-6"
              >
                {/* Top Row: Title, Ref & Status */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#D9C6A8]/30 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-dm font-bold text-xs text-[#C7833D] bg-[#FBF4EA] px-2.5 py-0.5 rounded-md border border-[#D9C6A8]/40">
                        {yatra.orderName}
                      </span>
                      <span className="text-xs text-[#8F6E5B] font-dm">• {yatra.duration}</span>
                    </div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#332C25]">
                      {yatra.yatraTitle}
                    </h3>
                    <p className="text-xs text-[#8F6E5B] font-dm mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C7833D]" />
                      <span>{yatra.destination}</span>
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-dm font-semibold border ${
                        isConfirmed
                          ? 'bg-[#EBF5EE] text-[#3E7C59] border-[#B9E0C7]'
                          : 'bg-[#F7F1E5] text-[#8F6E5B] border-[#D9C6A8]'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{yatra.status}</span>
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-dm tracking-wider text-[#8F6E5B] block">Total Package</span>
                      <span className="font-serif font-bold text-lg text-[#332C25]">
                        {formatCurrency(yatra.totalPrice.amount, yatra.totalPrice.currencyCode)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pilgrimage Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-dm text-[#8F6E5B]">
                  <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/50 border border-[#D9C6A8]/30 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#C7833D] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider block text-[#8F6E5B]">Pilgrimage Dates</span>
                      <span className="font-semibold text-[#332C25]">{yatra.dates}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/50 border border-[#D9C6A8]/30 flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#C7833D] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider block text-[#8F6E5B]">Devotees Traveling</span>
                      <span className="font-semibold text-[#332C25]">{yatra.passengers} Sadhakas</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/50 border border-[#D9C6A8]/30 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                    <PhoneCall className="w-5 h-5 text-[#3E7C59] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider block text-[#8F6E5B]">Dedicated Sevak</span>
                      <span className="font-semibold text-[#332C25]">+91 8000 700 800</span>
                    </div>
                  </div>
                </div>

                {/* Inclusions */}
                <div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#8F6E5B] block mb-2 font-dm">
                    Sacred Inclusions
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {yatra.inclusions.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF6EE] border border-[#D9C6A8]/50 text-xs font-dm text-[#332C25]"
                      >
                        <span className="text-[#C7833D]">✦</span>
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pilgrimage Support Notice */}
                <div className="border-t border-[#D9C6A8]/30 pt-4 text-xs font-dm text-[#8F6E5B]">
                  <span>Need to reschedule or add a companion? Contact your dedicated sacred yatra coordinator at +91 8000 700 800.</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
