import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { MallProduct } from '../data/mallData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: MallProduct[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: MallProduct) => void;
  onSelectProduct: (product: MallProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-dm">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-[#FEFBF2] shadow-2xl pointer-events-auto border-l border-[#C59239]/30 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#C59239]/20 flex items-center justify-between bg-white/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#98555E]/10 flex items-center justify-center text-[#98555E]">
                    <Heart className="w-4 h-4 fill-[#98555E]" />
                  </div>
                  <div>
                    <h2 className="font-cormorant font-bold text-xl text-[#221508]">
                      My Wishlist
                    </h2>
                    <p className="text-[11px] text-[#3D2619]/70">
                      {wishlistItems.length} {wishlistItems.length === 1 ? 'offering' : 'offerings'} saved
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 text-[#3D2619]/70 hover:text-[#221508] transition-colors cursor-pointer"
                  title="Close wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#C59239]/20">
                {wishlistItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-[#C59239]/15 flex items-center justify-center text-[#98555E] mb-4">
                      <Heart className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h3 className="font-cormorant font-bold text-2xl text-[#221508]">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs text-[#3D2619]/70 mt-2 max-w-xs leading-relaxed">
                      Tap the heart icon ♡ on any offering to save it to your sacred collection.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#98555E] to-[#51000F] text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-sm"
                    >
                      Explore Offerings
                    </button>
                  </div>
                ) : (
                  wishlistItems.map((prod) => (
                    <div key={prod.id} className="py-4 flex gap-4 items-center group">
                      {/* Product Thumbnail */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                        className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#C59239]/20 shrink-0 cursor-pointer"
                      >
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </button>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59239] block">
                          {prod.categoryLabel}
                        </span>
                        <h4
                          onClick={() => {
                            onSelectProduct(prod);
                            onClose();
                          }}
                          className="font-cormorant font-bold text-base text-[#221508] truncate hover:text-[#98555E] cursor-pointer"
                        >
                          {prod.title}
                        </h4>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-bold text-sm text-[#98555E]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          {prod.originalPrice > prod.price && (
                            <span className="text-xs text-[#3D2619]/50 line-through">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onMoveToCart(prod);
                              onRemoveFromWishlist(prod.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#98555E] to-[#51000F] hover:brightness-110 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Move to Cart</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemoveFromWishlist(prod.id)}
                            className="p-1.5 text-[#3D2619]/50 hover:text-[#98555E] transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-4 border-t border-[#C59239]/20 bg-white/80 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      wishlistItems.forEach(prod => onMoveToCart(prod));
                      onClose();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#98555E] to-[#51000F] hover:brightness-110 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all active:scale-98"
                  >
                    <span>Move All to Basket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
