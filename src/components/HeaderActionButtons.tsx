import React from 'react';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { openShopifyAccount } from '../lib/shopify';

export interface HeaderActionButtonsProps {
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAccount?: () => void;
  className?: string;
  isHero?: boolean;
}

export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount = openShopifyAccount,
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
          "group relative flex items-center h-10 sm:h-11 px-3 rounded-full hover:bg-[#98555E] hover:border-[#98555E] hover:text-white transition-all duration-700 ease-in-out cursor-pointer overflow-hidden backdrop-blur-xl active:scale-95 border",
          isHero
            ? "bg-[#1A1612]/90 border-[#C59239]/60 text-[#E4B968] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(197,146,57,0.35)] hover:shadow-[0_8px_25px_rgba(152,85,94,0.45)]"
            : "bg-white/90 border-[#C59239]/40 text-[#98555E] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(152,85,94,0.35)]"
        )}
        title="Sacred Wishlist"
        aria-label="Open sacred wishlist"
      >
        <Heart
          className={cn(
            "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-all duration-700 ease-in-out group-hover:scale-110",
            wishlistCount > 0
              ? (isHero 
                  ? "fill-[#E4B968] text-[#E4B968] group-hover:fill-white group-hover:text-white"
                  : "fill-[#98555E] text-[#98555E] group-hover:fill-white group-hover:text-white")
              : (isHero
                  ? "fill-transparent text-[#E4B968] group-hover:text-white"
                  : "fill-transparent text-[#98555E] group-hover:text-white")
          )}
        />

        <span className={cn(
          "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold group-hover:text-white transition-all duration-700 ease-in-out",
          isHero ? "text-[#E4B968]" : "text-[#98555E]"
        )}>
          Wishlist
        </span>

        {wishlistCount > 0 && (
          <span className={cn(
            "ml-1.5 w-4.5 h-4.5 rounded-full font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out",
            isHero
              ? "bg-[#C59239] group-hover:bg-white text-[#1A1612] group-hover:text-[#98555E]"
              : "bg-[#98555E] group-hover:bg-white text-white group-hover:text-[#98555E]"
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
          "group relative flex items-center h-10 sm:h-11 px-3 rounded-full hover:bg-gradient-to-r hover:from-[#FE7613] hover:to-[#C59239] hover:border-[#C59239] hover:text-white transition-all duration-700 ease-in-out cursor-pointer overflow-hidden active:scale-95 backdrop-blur-xl border",
          isHero
            ? "bg-[#1A1612]/90 border-[#C59239]/60 text-[#E4B968] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(197,146,57,0.35)] hover:shadow-[0_8px_25px_rgba(254,118,19,0.45)]"
            : "bg-white/90 border-[#C59239]/40 text-[#FE7613] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(254,118,19,0.4)]"
        )}
        title="Sacred Basket"
        aria-label="Open sacred basket"
      >
        <ShoppingBag className={cn(
          "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:text-white",
          isHero ? "text-[#E4B968]" : "text-[#FE7613]"
        )} />

        <span className={cn(
          "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold group-hover:text-white transition-all duration-700 ease-in-out",
          isHero ? "text-[#E4B968]" : "text-[#FE7613]"
        )}>
          Basket
        </span>

        <span className={cn(
          "ml-1.5 w-4.5 h-4.5 rounded-full font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out",
          isHero
            ? "bg-[#C59239] group-hover:bg-white text-[#1A1612] group-hover:text-[#FE7613]"
            : "bg-[#FE7613] group-hover:bg-white text-white group-hover:text-[#FE7613]"
        )}>
          {cartCount}
        </span>
      </button>

      {/* 3. User Account Button */}
      <button
        type="button"
        onClick={onOpenAccount}
        className={cn(
          "group relative flex items-center h-10 sm:h-11 px-3 rounded-full hover:bg-[#221508] hover:border-[#221508] hover:text-[#FEFBF2] transition-all duration-700 ease-in-out cursor-pointer overflow-hidden backdrop-blur-xl active:scale-95 border",
          isHero
            ? "bg-[#1A1612]/90 border-[#C59239]/60 text-[#E4B968] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(197,146,57,0.35)] hover:shadow-[0_8px_25px_rgba(34,21,8,0.45)]"
            : "bg-white/90 border-[#C59239]/40 text-[#221508] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(34,21,8,0.35)]"
        )}
        title="My Account"
        aria-label="Open user account profile"
      >
        <User className={cn(
          "w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:text-[#FEFBF2]",
          isHero ? "text-[#E4B968]" : "text-[#221508]"
        )} />

        <span className={cn(
          "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold group-hover:text-[#FEFBF2] transition-all duration-700 ease-in-out",
          isHero ? "text-[#E4B968]" : "text-[#221508]"
        )}>
          Account
        </span>
      </button>

    </div>
  );
};
