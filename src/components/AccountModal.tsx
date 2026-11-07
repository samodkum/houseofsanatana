import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Crown, ShieldCheck, ShoppingBag, Heart, Calendar, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { SunIcon } from './SunIcon';
import { HOS_LOGO_URL } from '../lib/constants';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onNavigatePage?: (page: 'home' | 'mall' | 'travel' | 'join') => void;
  cartCount?: number;
  wishlistCount?: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist,
  onOpenCart,
  onNavigatePage,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-dm">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FEFBF2] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#C59239]/30 overflow-hidden z-10 text-[#221508]"
          >
            {/* Header Banner */}
            <div className="relative p-6 sm:p-7 bg-gradient-to-br from-[#221508] via-[#332C25] to-[#1A1612] text-[#FEFBF2]">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close profile modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#E4B968] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FE7613] to-[#C59239] p-0.5 shadow-lg flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-[14px] bg-[#221508] flex items-center justify-center p-1.5">
                    <img 
                      src={HOS_LOGO_URL} 
                      alt="House of Sanatan Logo" 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C59239]/25 border border-[#C59239]/40 text-[#E4B968] text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Crown className="w-3 h-3 text-[#C59239]" />
                    <span>॥ कुल भूषण ॥ Gold Sangha Member</span>
                  </div>
                  <h3 className="font-cormorant font-bold text-2xl text-white">
                    Sacred Sadhaka Profile
                  </h3>
                  <p className="text-xs text-[#E4B968]/80 font-mono">
                    ID: HOS-SANATAN-2026-7842
                  </p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5">
              
              {/* Quick Status Cards */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenWishlist();
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-[#C59239]/25 hover:border-[#98555E] text-left transition-all hover:shadow-xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Wishlist</span>
                    <Heart className="w-4 h-4 text-[#98555E] fill-[#98555E]" />
                  </div>
                  <span className="font-dm font-bold text-lg text-[#221508] block">
                    {wishlistCount} Offerings
                  </span>
                  <span className="text-[11px] text-[#98555E] font-medium group-hover:underline">
                    View saved items &rarr;
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-[#C59239]/25 hover:border-[#FE7613] text-left transition-all hover:shadow-xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Sacred Basket</span>
                    <ShoppingBag className="w-4 h-4 text-[#FE7613]" />
                  </div>
                  <span className="font-dm font-bold text-lg text-[#221508] block">
                    {cartCount} In Cart
                  </span>
                  <span className="text-[11px] text-[#FE7613] font-medium group-hover:underline">
                    Proceed to checkout &rarr;
                  </span>
                </button>
              </div>

              {/* Devotional Status */}
              <div className="p-4 rounded-2xl bg-[#C59239]/10 border border-[#C59239]/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508]">
                    Active Sankalpa & Sadhana
                  </span>
                  <span className="text-[10px] font-bold text-[#607427] bg-[#607427]/15 px-2 py-0.5 rounded-full">
                    Consecrated Active
                  </span>
                </div>
                <p className="font-dm text-xs text-[#3D2619] font-medium leading-relaxed">
                  Daily Brahma Muhurta Puja & Sandhya Vandana • Varanasi Peetham Offering scheduled
                </p>
              </div>

              {/* Navigation Shortcuts */}
              <div className="space-y-2">
                {onNavigatePage && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigatePage('join');
                    }}
                    className="w-full p-3 rounded-xl bg-white hover:bg-stone-50 border border-[#C59239]/25 flex items-center justify-between text-xs font-bold text-[#221508] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#C59239]" />
                      <span>Digital Sanctum Pass & Daily Chants</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                )}

                {onNavigatePage && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigatePage('travel');
                    }}
                    className="w-full p-3 rounded-xl bg-white hover:bg-stone-50 border border-[#C59239]/25 flex items-center justify-between text-xs font-bold text-[#221508] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#607427]" />
                      <span>My Sacred Yatra Bookings</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                )}
              </div>

              {/* Help & Support Footer */}
              <div className="pt-2 border-t border-[#C59239]/20 flex items-center justify-between text-[11px] text-[#3D2619]/80">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#C59239]" />
                  <span>24/7 Peetham Seva Helpline</span>
                </span>
                <span className="font-medium text-[#C59239]">
                  support@houseofsanatan.com
                </span>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
