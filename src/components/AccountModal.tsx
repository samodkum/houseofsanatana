import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Crown, ShieldCheck, ShoppingBag, Heart, Calendar, Phone, ArrowRight, ExternalLink, Package } from 'lucide-react';
import { SunIcon } from './SunIcon';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenOrders?: () => void;
  onNavigatePage?: (page: 'home' | 'mall' | 'travel' | 'join' | 'orders') => void;
  cartCount?: number;
  wishlistCount?: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist,
  onOpenCart,
  onOpenOrders,
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
            className="relative w-full max-w-lg bg-[#FAF6EE] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#DECDB8] overflow-hidden z-10 text-[#26201B]"
          >
            {/* Header Banner */}
            <div className="relative p-6 sm:p-7 bg-gradient-to-br from-[#26201B] via-[#332C25] to-[#1A1612] text-[#F7F1E5]">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close profile modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#D9C6A8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7833D] to-[#B08A4A] p-0.5 shadow-lg flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-[14px] bg-[#26201B] flex items-center justify-center">
                    <SunIcon className="w-7 h-7 text-[#D9C6A8]" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C7833D]/25 border border-[#C7833D]/40 text-[#D9C6A8] text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Crown className="w-3 h-3 text-[#C7833D]" />
                    <span>॥ कुल भूषण ॥ Gold Sangha Member</span>
                  </div>
                  <h3 className="font-cormorant font-bold text-2xl text-white">
                    Sacred Sadhaka Profile
                  </h3>
                  <p className="text-xs text-[#D9C6A8]/80 font-mono">
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
                  className="p-3.5 rounded-2xl bg-white border border-[#DECDB8] hover:border-[#58111A] text-left transition-all hover:shadow-xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Wishlist</span>
                    <Heart className="w-4 h-4 text-[#58111A] fill-[#58111A]" />
                  </div>
                  <span className="font-dm font-bold text-lg text-[#26201B] block">
                    {wishlistCount} Offerings
                  </span>
                  <span className="text-[11px] text-[#58111A] font-medium group-hover:underline">
                    View saved items &rarr;
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCart();
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-[#DECDB8] hover:border-[#C7833D] text-left transition-all hover:shadow-xs group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Sacred Basket</span>
                    <ShoppingBag className="w-4 h-4 text-[#C7833D]" />
                  </div>
                  <span className="font-dm font-bold text-lg text-[#26201B] block">
                    {cartCount} In Cart
                  </span>
                  <span className="text-[11px] text-[#C7833D] font-medium group-hover:underline">
                    Proceed to checkout &rarr;
                  </span>
                </button>
              </div>

              {/* Devotional Status */}
              <div className="p-4 rounded-2xl bg-[#EFE7D8]/80 border border-[#D9C6A8]/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-dm font-bold text-xs uppercase tracking-wider text-[#8F6E5B]">
                    Active Sankalpa & Sadhana
                  </span>
                  <span className="text-[10px] font-bold text-[#66705A] bg-[#66705A]/15 px-2 py-0.5 rounded-full">
                    Consecrated Active
                  </span>
                </div>
                <p className="font-dm text-xs text-[#26201B] font-medium leading-relaxed">
                  Daily Brahma Muhurta Puja & Sandhya Vandana • Varanasi Peetham Offering scheduled
                </p>
              </div>

              {/* Navigation Shortcuts */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenOrders) {
                      onOpenOrders();
                    } else if (onNavigatePage) {
                      onNavigatePage('orders');
                    }
                  }}
                  className="w-full p-3.5 rounded-xl bg-gradient-to-r from-[#FAF6EE] to-[#F4EDE0] hover:from-[#F4EDE0] hover:to-[#EFE5D7] border border-[#C7833D]/50 flex items-center justify-between text-xs font-bold text-[#58111A] transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-[#58111A]" />
                    <span>My Sacred Orders & Yatras</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#C7833D] font-medium bg-[#C7833D]/10 px-2 py-0.5 rounded-md">
                      Products & Travel
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#58111A] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {onNavigatePage && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigatePage('join');
                    }}
                    className="w-full p-3 rounded-xl bg-white hover:bg-stone-50 border border-[#DECDB8] flex items-center justify-between text-xs font-bold text-[#26201B] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#C7833D]" />
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
                    className="w-full p-3 rounded-xl bg-white hover:bg-stone-50 border border-[#DECDB8] flex items-center justify-between text-xs font-bold text-[#26201B] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#66705A]" />
                      <span>Explore Sacred Yatras</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                )}
              </div>

              {/* Help & Support Footer */}
              <div className="pt-2 border-t border-[#DECDB8]/60 flex items-center justify-between text-[11px] text-[#8F6E5B]">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#C7833D]" />
                  <span>24/7 Peetham Seva Helpline</span>
                </span>
                <span className="font-medium text-[#C7833D]">
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
