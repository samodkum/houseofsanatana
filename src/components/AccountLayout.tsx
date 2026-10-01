import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  User, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck,
  CheckCircle,
  Clock,
  Compass,
  Loader2,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { OrdersPanel } from './OrdersPanel';
import { YatrasPanel, YatraBooking } from './YatrasPanel';
import { ProfilePanel } from './ProfilePanel';
import { SettingsPanel } from './SettingsPanel';
import { useCustomer, CustomerData } from '../hooks/useCustomer';

export type AccountTab = 'orders' | 'yatras' | 'profile' | 'settings';

interface AccountLayoutProps {
  customer?: CustomerData | null;
  isLoading?: boolean;
  isAuthenticated?: boolean;
  activeTab?: AccountTab;
  onTabChange?: (tab: AccountTab) => void;
  onUpdateProfile?: (firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  onLogout?: () => Promise<void>;
  onLogin?: () => void;
  onBackToStore?: () => void;
  logoUrl?: string;
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer: propCustomer,
  isLoading: propLoading,
  activeTab: controlledTab,
  onTabChange,
  onUpdateProfile: propUpdateProfile,
  onLogout,
  onBackToStore,
  logoUrl,
}) => {
  const customerHook = useCustomer();
  const customer = propCustomer !== undefined ? propCustomer : customerHook.customer;
  const isLoading = propLoading !== undefined ? propLoading : customerHook.isLoading;
  const error = customerHook.error;

  const [internalTab, setInternalTab] = useState<AccountTab>('orders');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTab = controlledTab || internalTab;

  const handleTabSelect = (tab: AccountTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
    setIsMobileMenuOpen(false);
  };

  const handleUpdateProfile = async (firstName: string, lastName: string) => {
    if (propUpdateProfile) {
      return propUpdateProfile(firstName, lastName);
    }
    return customerHook.updateProfile(firstName, lastName);
  };

  const handleLogoutAction = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      await customerHook.logout();
    }
  };

  // 1. Loading State while fetching from /api/customer
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F1E5] text-[#332C25] flex flex-col items-center justify-center p-6 font-dm">
        <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#D9C6A8] flex items-center justify-center mb-4 shadow-sm">
          <Loader2 className="w-8 h-8 text-[#C7833D] animate-spin" />
        </div>
        <h2 className="font-serif text-xl sm:text-2xl text-[#332C25] font-semibold mb-2">
          Loading Sacred Sanctum
        </h2>
        <p className="text-xs sm:text-sm text-[#8F6E5B] max-w-sm text-center">
          Connecting with your customer account...
        </p>
      </div>
    );
  }

  // 2. Error State if fetch fails or customer is null
  if (error || !customer) {
    return (
      <div className="min-h-screen bg-[#F7F1E5] text-[#332C25] flex flex-col items-center justify-center p-6 font-dm">
        <div className="w-full max-w-md bg-white border border-[#D9C6A8] rounded-3xl p-8 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#D9C6A8] flex items-center justify-center mx-auto text-[#B33927] shadow-inner">
            <AlertCircle className="w-8 h-8 text-[#B33927]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B33927] block mb-1">
              Authentication Required
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#332C25]">
              Unable to Access Sanctum
            </h2>
            <p className="text-xs text-[#8F6E5B] mt-2 leading-relaxed">
              {error || 'No active customer session found. Please sign in to view your orders and devotee profile.'}
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="button"
              onClick={() => customerHook.login()}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#8F6E5B] text-white font-dm font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Shopify</span>
            </button>

            <button
              type="button"
              onClick={onBackToStore || (() => (window.location.href = '/'))}
              className="w-full py-2.5 rounded-xl border border-[#D9C6A8] hover:border-[#C7833D] bg-white text-[#8F6E5B] hover:text-[#C7833D] font-dm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Back to Sanctum
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Dynamic Orders and Yatras Derivation (No Mock Data)
  const allOrders = customer.orders?.nodes || [];

  const yatraOrders = allOrders.filter((order) => {
    return order.name.toLowerCase().includes('ytr') || 
      order.lineItems?.nodes?.some(item => 
        item.title.toLowerCase().includes('yatra') || 
        item.title.toLowerCase().includes('pilgrimage') ||
        item.title.toLowerCase().includes('expedition')
      );
  });

  const productOrders = allOrders.filter((order) => {
    const isYatra = order.name.toLowerCase().includes('ytr') || 
      order.lineItems?.nodes?.some(item => 
        item.title.toLowerCase().includes('yatra') || 
        item.title.toLowerCase().includes('pilgrimage') ||
        item.title.toLowerCase().includes('expedition')
      );
    return !isYatra;
  });

  const yatraBookings: YatraBooking[] = yatraOrders.map((order) => {
    const firstItem = order.lineItems?.nodes?.[0];
    return {
      id: order.id,
      orderName: order.name,
      yatraTitle: firstItem?.title || 'Sacred Himalayan Yatra',
      destination: 'Sacred Sanctum Destination',
      duration: 'Multi-day Pilgrimage',
      dates: new Date(order.processedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      passengers: firstItem?.quantity || 1,
      totalPrice: order.totalPrice,
      status: (order.fulfillments?.[0]?.displayStatus?.toLowerCase().includes('confirmed') ? 'Confirmed' : 'Upcoming') as any,
      inclusions: ['Sanctum Darshan Access', 'Consecrated Offerings', 'Vedic Priest & Guide'],
    };
  });

  const navItems: Array<{ id: AccountTab; label: string; icon: React.ElementType; badge?: number }> = [
    { 
      id: 'orders', 
      label: 'Products Purchased', 
      icon: ShoppingBag, 
      badge: productOrders.length 
    },
    { 
      id: 'yatras', 
      label: 'Travel Packages', 
      icon: Compass, 
      badge: yatraBookings.length 
    },
    { 
      id: 'profile', 
      label: 'Sadhaka Profile', 
      icon: User 
    },
    { 
      id: 'settings', 
      label: 'Settings & Security', 
      icon: Settings 
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E5] text-[#332C25] flex flex-col font-dm selection:bg-[#C7833D]/20 selection:text-[#332C25]">
      {/* Top Bar / Navigation */}
      <header className="sticky top-0 z-30 bg-[#F7F1E5]/95 backdrop-blur-md border-b border-[#D9C6A8]/60 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToStore || (() => (window.location.href = '/'))}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F6E5B] hover:text-[#C7833D] transition-colors py-1.5 px-3.5 rounded-full bg-white/70 hover:bg-white border border-[#D9C6A8]/50 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sanctum</span>
          </button>
        </div>

        {/* Brand Center */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#D9C6A8] shadow-xs shrink-0 bg-[#1A1612]">
            <img
              src={logoUrl || "https://res.cloudinary.com/dzc1dckta/image/upload/v1790697704/HOS_logo_bpd1v5.jpg"}
              alt="House of Sanatana"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-left">
            <h1 className="font-serif text-sm sm:text-base font-bold tracking-widest text-[#332C25] uppercase leading-tight">
              House of Sanatana
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-[#C7833D] hidden sm:block font-semibold">
              Sacred Devotee Sanctum
            </p>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogoutAction}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#8F6E5B] hover:text-[#B33927] transition-colors py-1.5 px-3.5 rounded-full hover:bg-[#FDF2F2] cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#332C25] hover:bg-[#EFE8DA] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* ======================================================== */}
        {/* SIDEBAR NAVIGATION                                       */}
        {/* ======================================================== */}
        <aside
          className={`md:col-span-4 lg:col-span-3 bg-[#FFFFFF] border border-[#D9C6A8]/70 rounded-3xl p-6 shadow-[0_8px_30px_rgba(51,44,37,0.05)] transition-all md:sticky md:top-24 ${
            isMobileMenuOpen ? 'block mb-4' : 'hidden md:block'
          }`}
        >
          {/* Devotee Info (Clean without DP) */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-[#D9C6A8]/40">
            <h3 className="font-serif font-bold text-lg text-[#332C25]">
              {customer.displayName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Blessed Devotee'}
            </h3>
            <p className="text-xs text-[#8F6E5B] font-dm truncate max-w-[200px] mt-0.5">
              {customer.emailAddress?.emailAddress || ''}
            </p>

            <span className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-dm uppercase tracking-widest text-[#3E7C59] bg-[#EBF5EE] border border-[#B9E0C7] px-2.5 py-0.5 rounded-full font-semibold">
              <ShieldCheck className="w-3 h-3" />
              Verified Devotee
            </span>
          </div>

          {/* Nav List */}
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabSelect(item.id)}
                  className={`group relative w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'text-[#C7833D] bg-[#FBF4EA] border-[#C7833D]/60 shadow-xs'
                      : 'text-[#8F6E5B] border-transparent hover:text-[#C7833D] hover:bg-[#FBF4EA] hover:border-[#C7833D]/50 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-[#C7833D]' : 'text-[#8F6E5B] group-hover:text-[#C7833D]'}`} />
                    <span className="transition-colors duration-200">{item.label}</span>
                  </div>

                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#C7833D] text-white shadow-2xs' 
                        : 'bg-[#D9C6A8]/40 text-[#8F6E5B] group-hover:bg-[#C7833D] group-hover:text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#C7833D]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sign Out Footer */}
          <div className="mt-8 pt-6 border-t border-[#D9C6A8]/40">
            <button
              type="button"
              onClick={handleLogoutAction}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#8F6E5B] hover:text-[#C7833D] hover:bg-[#FBF4EA] border border-transparent hover:border-[#C7833D]/40 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Dashboard</span>
            </button>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* MAIN CONTENT AREA WITH MOTION PANEL TRANSITIONS          */}
        {/* ======================================================== */}
        <main className="md:col-span-8 lg:col-span-9 min-h-[550px] relative">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div
                key="orders-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <OrdersPanel 
                  orders={productOrders} 
                  isLoading={isLoading} 
                />
              </motion.div>
            )}

            {activeTab === 'yatras' && (
              <motion.div
                key="yatras-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <YatrasPanel 
                  yatras={yatraBookings} 
                  isLoading={isLoading} 
                  onExploreYatras={() => {
                    if (onBackToStore) onBackToStore();
                    window.location.hash = 'travel';
                  }}
                />
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProfilePanel 
                  customer={customer} 
                  onUpdateProfile={handleUpdateProfile} 
                />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <SettingsPanel 
                  onLogout={handleLogoutAction} 
                  customerEmail={customer.emailAddress?.emailAddress} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
