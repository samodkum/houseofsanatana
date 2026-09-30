import React from 'react';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { cn } from '../lib/utils';

export interface HeaderActionButtonsProps {
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  className?: string;
  isHero?: boolean;
}

export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount,
  className = '',
  isHero = false,
}) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none pointer-events-auto ${className}`}>
      
      {/* 1. Wishlist Button */}
      <button
        type="button"
        onClick={onOpenWishlist}
        className={cn(
          "group relative flex items-center h-10 sm:h-11 px-3 rounded-full hover:bg-[#58111A] hover:border-[#58111A] hover:text-white transition-all duration-700 ease-in-out cursor-pointer overflow-hidden backdrop-blur-xl active:scale-95 border",
          isHero
            ? "bg-[#1A1612]/90 border-[#B08A4A]/60 text-[#D9C6A8] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(176,138,74,0.35)] hover:shadow-[0_8px_25px_rgba(88,17,26,0.45)]"
            : "bg-white/90 border-[#D9C6A8] text-[#58111A] shadow-[0_4px_16px_rgba(0,0,0,0.06),_0_0_0px_rgba(176,138,74,0)] hover:shadow-[0_8px_25px_rgba(88,17,26,0.35)]"
        )}
        title="Sacred Wishlist"
        aria-label="Open sacred wishlist"
      >
        <Heart
          className={cn(
            "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-all duration-700 ease-in-out group-hover:scale-110",
            wishlistCount > 0
              ? (isHero 
                  ? "fill-[#D9C6A8] text-[#D9C6A8] group-hover:fill-white group-hover:text-white"
                  : "fill-[#58111A] text-[#58111A] group-hover:fill-white group-hover:text-white")
              : (isHero
                  ? "fill-transparent text-[#D9C6A8] group-hover:text-white"
                  : "fill-transparent text-[#58111A] group-hover:text-white")
          )}
        />

        <span className={cn(
          "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold group-hover:text-white transition-all duration-700 ease-in-out",
          isHero ? "text-[#D9C6A8]" : "text-[#58111A]"
        )}>
          Wishlist
        </span>

        {wishlistCount > 0 && (
          <span className={cn(
            "ml-1.5 w-4.5 h-4.5 rounded-full font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out",
            isHero
              ? "bg-[#B08A4A] group-hover:bg-white text-[#1A1612] group-hover:text-[#58111A]"
              : "bg-[#58111A] group-hover:bg-white text-white group-hover:text-[#58111A]"
          )}>
            {wishlistCount}
          </span>
        )}
      </button>

      {/* 2. Sacred Basket Button */}
      <button
        type="button"
        onClick={onOpenCart}
        className={cn(
          "group relative flex items-center h-10 sm:h-11 px-3 rounded-full hover:bg-gradient-to-r hover:from-[#C7833D] hover:to-[#B08A4A] hover:border-[#B08A4A] hover:text-white transition-all duration-700 ease-in-out cursor-pointer overflow-hidden active:scale-95 backdrop-blur-xl border",
          isHero
            ? "bg-[#1A1612]/90 border-[#B08A4A]/60 text-[#D9C6A8] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(176,138,74,0.35)] hover:shadow-[0_8px_25px_rgba(199,131,61,0.45)]"
            : "bg-white/90 border-[#D9C6A8] text-[#C7833D] shadow-[0_4px_16px_rgba(0,0,0,0.06),_0_0_0px_rgba(176,138,74,0)] hover:shadow-[0_8px_25px_rgba(199,131,61,0.4)]"
        )}
        title="Sacred Basket"
        aria-label="Open sacred basket"
      >
        <ShoppingBag className={cn(
          "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:text-white",
          isHero ? "text-[#D9C6A8]" : "text-[#C7833D]"
        )} />

        <span className={cn(
          "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold group-hover:text-white transition-all duration-700 ease-in-out",
          isHero ? "text-[#D9C6A8]" : "text-[#C7833D]"
        )}>
          Basket
        </span>

        <span className={cn(
          "ml-1.5 w-4.5 h-4.5 rounded-full font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out",
          isHero
            ? "bg-[#B08A4A] group-hover:bg-white text-[#1A1612] group-hover:text-[#C7833D]"
            : "bg-[#C7833D] group-hover:bg-white text-white group-hover:text-[#C7833D]"
        )}>
          {cartCount}
        </span>
      </button>

      {/* 3. User Account Button */}
      <button
        type="button"
        onClick={onOpenAccount}
        className={cn(
          "group relative flex items-center h-10 sm:h-11 px-3 rounded-full hover:bg-[#26201B] hover:border-[#26201B] hover:text-[#F7F1E5] transition-all duration-700 ease-in-out cursor-pointer overflow-hidden backdrop-blur-xl active:scale-95 border",
          isHero
            ? "bg-[#1A1612]/90 border-[#B08A4A]/60 text-[#D9C6A8] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(176,138,74,0.35)] hover:shadow-[0_8px_25px_rgba(38,32,27,0.45)]"
            : "bg-white/90 border-[#D9C6A8] text-[#26201B] shadow-[0_4px_16px_rgba(0,0,0,0.06),_0_0_0px_rgba(176,138,74,0)] hover:shadow-[0_8px_25px_rgba(38,32,27,0.35)]"
        )}
        title="My Account"
        aria-label="Open user account profile"
      >
        <User className={cn(
          "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:text-[#F7F1E5]",
          isHero ? "text-[#D9C6A8]" : "text-[#26201B]"
        )} />

        <span className={cn(
          "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold group-hover:text-[#F7F1E5] transition-all duration-700 ease-in-out",
          isHero ? "text-[#D9C6A8]" : "text-[#26201B]"
        )}>
          Account
        </span>
      </button>

    </div>
  );
};
