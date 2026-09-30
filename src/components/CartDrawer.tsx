import React, { useState } from 'react';
import { CartItem } from '../types/homepage';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { createShopifyCheckout, SHOPIFY_DOMAIN } from '../lib/shopify';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.kit.price * item.quantity, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Build checkout lines with item details & custom attributes
      const lines = items.map(item => ({
        merchandiseId: item.kit.id.startsWith('gid://') ? item.kit.id : '',
        quantity: item.quantity,
        attributes: [
          { key: 'Product', value: item.kit.title },
          { key: 'Price', value: `₹${item.kit.price}` },
          { key: 'Sacred Category', value: item.kit.category || 'General' },
        ],
      }));

      // Try creating Shopify cart / checkout
      const validLines = lines.filter(l => Boolean(l.merchandiseId));
      let checkoutUrl = '';
      
      if (validLines.length > 0) {
        checkoutUrl = await createShopifyCheckout(validLines);
      } else {
        // Direct redirect to Shopify store's checkout/cart with custom note or destination
        checkoutUrl = `https://${SHOPIFY_DOMAIN}/cart`;
      }

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      // Fallback
      window.location.href = `https://${SHOPIFY_DOMAIN}/cart`;
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#8F6E5B]/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F1E5] border-l border-[#D9C6A8] shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-[#D9C6A8] flex items-center justify-between bg-[#D9C6A8]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D9C6A8]/30 border border-[#B08A4A]/40 flex items-center justify-center text-[#C7833D]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cormorant text-lg font-semibold text-[#8F6E5B]">
                  Sacred Puja Basket
                </h3>
                <span className="text-[11px] font-dm text-[#8F6E5B]/70 font-medium">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#8F6E5B]/5 border border-[#D9C6A8] text-[#8F6E5B] hover:text-[#8F6E5B] hover:border-[#B08A4A] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 px-4 text-[#8F6E5B]/70">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#C7833D]" />
                <p className="font-cormorant text-xl font-semibold text-[#8F6E5B]">Your Sacred Basket is Empty</p>
                <p className="font-dm text-xs text-[#8F6E5B]/70 mt-1 font-normal">
                  Explore our Nitya Daily or Festival Anushthan kits to invite divine grace into your shrine.
                </p>
              </div>
            ) : (
              items.map(({ kit, quantity }) => (
                <div 
                  key={kit.id}
                  className="p-4 rounded-2xl bg-white/85 border border-[#D9C6A8] flex gap-3.5 items-center shadow-xs"
                >
                  <img 
                    src={kit.image} 
                    alt={kit.title} 
                    className="w-16 h-16 rounded-xl object-cover border border-[#D9C6A8] shrink-0" 
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-cormorant text-base font-semibold text-[#8F6E5B] truncate">
                      {kit.title}
                    </h4>
                    <span className="font-dm text-xs font-bold text-[#C7833D] block mt-0.5">
                      ₹{(kit.price * quantity).toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(kit.id, -1)}
                        className="w-6 h-6 rounded-md bg-[#D9C6A8]/30 border border-[#D9C6A8] text-[#C7833D] flex items-center justify-center hover:bg-[#D9C6A8]/50 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-dm font-bold text-[#8F6E5B] px-1">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(kit.id, 1)}
                        className="w-6 h-6 rounded-md bg-[#D9C6A8]/30 border border-[#D9C6A8] text-[#C7833D] flex items-center justify-center hover:bg-[#D9C6A8]/50 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(kit.id)}
                        className="ml-auto text-[#8F6E5B]/50 hover:text-[#C7833D] p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#D9C6A8] bg-[#D9C6A8]/20 space-y-4">
              <div className="flex items-center justify-between text-xs font-dm text-[#8F6E5B]/80">
                <span>Consecrated Packaging & Express Courier:</span>
                <span className="text-[#66705A] font-semibold">FREE</span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[#D9C6A8]">
                <span className="font-dm text-xs font-semibold text-[#8F6E5B]">Sacred Offering Total:</span>
                <span className="font-dm text-2xl font-extrabold text-[#C7833D]">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#C7833D] text-[#F7F1E5] font-dm font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Sacred Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Sacred Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-dm text-[#8F6E5B]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08A4A]" />
                <span>Blessed with pure Gomukh Gangajal sample in every order</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
