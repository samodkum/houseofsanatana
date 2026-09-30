import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Crown, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  LogIn, 
  Loader2, 
  Package, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { SunIcon } from './SunIcon';
import { 
  ShopifyCustomer, 
  getCustomerDetails, 
  getStoredCustomerToken, 
  getStoredCustomerData,
  clearStoredCustomerAuth,
  SHOPIFY_ACCOUNT_URL,
  redirectToShopifyAuthorize
} from '../lib/shopify';

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
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(() => getStoredCustomerData());
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync customer details when opened
  useEffect(() => {
    if (!isOpen) return;

    const storedData = getStoredCustomerData();
    if (storedData) {
      setCustomer(storedData);
    }

    const token = getStoredCustomerToken();
    if (token) {
      setLoading(true);
      getCustomerDetails(token)
        .then((data) => {
          if (data) {
            setCustomer(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleLogout = () => {
    clearStoredCustomerAuth();
    setCustomer(null);
    setSuccessMessage('Signed out successfully.');
  };

  const handleSignIn = () => {
    onClose();
    redirectToShopifyAuthorize();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-dm">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Clean Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#FAF6EE] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#DECDB8] overflow-hidden z-10 text-[#26201B] p-6 sm:p-8 flex flex-col items-center text-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close profile modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE7D8] hover:bg-[#DECDB8] text-[#8F6E5B] hover:text-[#26201B] flex items-center justify-center transition-all cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Centered Sacred Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C7833D] to-[#B08A4A] p-0.5 shadow-lg flex items-center justify-center text-white shrink-0 mb-3 mt-1">
              <div className="w-full h-full rounded-[14px] bg-[#26201B] flex items-center justify-center">
                <SunIcon className="w-8 h-8 text-[#D9C6A8]" />
              </div>
            </div>

            {/* Centered Brand Name */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C7833D]/15 border border-[#C7833D]/30 text-[#8F6E5B] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <Crown className="w-3 h-3 text-[#C7833D]" />
                <span>॥ House of Sanatan ॥</span>
              </div>
              <h2 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#26201B] tracking-wide">
                HOUSE OF SANATAN
              </h2>
              <p className="text-xs text-[#8F6E5B] mt-0.5 font-dm">
                {customer ? customer.email : 'Sacred Devotee Portal'}
              </p>
            </div>

            {/* Notification Alerts */}
            {errorMessage && (
              <div className="w-full mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="w-full mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 text-left">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
              <div className="py-8 flex flex-col items-center justify-center text-[#8F6E5B]">
                <Loader2 className="w-7 h-7 animate-spin text-[#C7833D] mb-2" />
                <p className="text-xs font-dm">Connecting to sacred profile...</p>
              </div>
            ) : !customer ? (
              /* ======================================================== */
              /* SIMPLE UNAUTHENTICATED STATE: 1 SIGN IN / SIGN UP BUTTON */
              /* ======================================================== */
              <div className="w-full space-y-4">
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#8F6E5B] text-white font-dm font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Sign Up</span>
                </button>

                <p className="text-xs text-stone-500 font-dm leading-relaxed">
                  Log in seamlessly with your email to view sacred orders, track deliveries, and manage your devotee profile.
                </p>
              </div>
            ) : (
              /* ======================================================== */
              /* AUTHENTICATED STATE: DEVOTEE PROFILE & ORDERS            */
              /* ======================================================== */
              <div className="w-full space-y-4 text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-[#DECDB8] text-center">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8F6E5B] block">Welcome</span>
                  <h3 className="font-cormorant font-bold text-xl text-[#26201B]">
                    {customer.firstName ? `${customer.firstName} ${customer.lastName}` : 'Blessed Devotee'}
                  </h3>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWishlist();
                    }}
                    className="p-3 rounded-xl bg-white border border-[#DECDB8] hover:border-[#58111A] transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase text-stone-500">Wishlist</span>
                      <Heart className="w-3.5 h-3.5 text-[#58111A] fill-[#58111A]" />
                    </div>
                    <span className="font-dm font-bold text-sm text-[#26201B] block">
                      {wishlistCount} Saved
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCart();
                    }}
                    className="p-3 rounded-xl bg-white border border-[#DECDB8] hover:border-[#C7833D] transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase text-stone-500">Basket</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C7833D]" />
                    </div>
                    <span className="font-dm font-bold text-sm text-[#26201B] block">
                      {cartCount} Items
                    </span>
                  </button>
                </div>

                {/* Orders History */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#DECDB8] space-y-2.5">
                  <span className="font-dm font-bold text-xs uppercase tracking-wider text-[#8F6E5B] flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#C7833D]" />
                    <span>Shopify Orders</span>
                  </span>

                  {customer.orders?.edges && customer.orders.edges.length > 0 ? (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {customer.orders.edges.map(({ node }) => (
                        <div key={node.id} className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#D9C6A8]/50 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-[#26201B]">Order #{node.orderNumber}</span>
                            <span className="block text-[10px] text-stone-500">
                              {new Date(node.processedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#C7833D]">
                              {node.totalPrice.currencyCode} {parseFloat(node.totalPrice.amount).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-500 py-1">No orders yet. Your purchases will appear here.</p>
                  )}
                </div>

                {/* Open Full Custom Account Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.location.href = '/account';
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#C7833D] text-white hover:bg-[#B08A4A] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  <span>Open Full Sacred Dashboard</span>
                </button>

                {/* Sign Out Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
