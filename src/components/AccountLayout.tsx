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
  Compass, 
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { OrdersPanel } from './OrdersPanel';
import { ProfilePanel } from './ProfilePanel';
import { SettingsPanel } from './SettingsPanel';
import { CustomerData, CustomerOrderNode } from '../hooks/useCustomer';

export type AccountTab = 'orders' | 'profile' | 'settings';

interface AccountLayoutProps {
  customer: CustomerData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  activeTab?: AccountTab;
  onTabChange?: (tab: AccountTab) => void;
  onUpdateProfile: (firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  onLogout: () => Promise<void>;
  onLogin: () => void;
  onBackToStore?: () => void;
  logoUrl?: string;
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  isLoading,
  isAuthenticated,
  activeTab: controlledTab,
  onTabChange,
  onUpdateProfile,
  onLogout,
  onLogin,
  onBackToStore,
  logoUrl,
}) => {
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

  const navItems: Array<{ id: AccountTab; label: string; icon: React.ElementType; badge?: number }> = [
    { 
      id: 'orders', 
      label: 'Sacred Orders', 
      icon: ShoppingBag, 
      badge: customer?.orders?.nodes?.length 
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
    <div className="min-h-screen bg-[var(--color-surface,#F7F1E5)] text-[var(--color-text,#332C25)] flex flex-col font-dm selection:bg-[#C7833D]/20 selection:text-[#332C25]">
      {/* Top Bar / Navigation for Mobile & Global Context */}
      <header className="sticky top-0 z-30 bg-[#F7F1E5]/90 backdrop-blur-md border-b border-[var(--color-border,#D9C6A8)]/60 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToStore || (() => (window.location.href = '/'))}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F6E5B] hover:text-[#C7833D] transition-colors py-1.5 px-3 rounded-full hover:bg-[#EFE8DA]/60 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Sanctum</span>
          </button>
        </div>

        {/* Brand Center */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C7833D] to-[#B08A4A] flex items-center justify-center text-white shadow-sm ring-2 ring-[#D9C6A8]/50">
            <span className="font-serif font-bold text-sm tracking-tighter">ॐ</span>
          </div>
          <div className="text-center">
            <h1 className="font-serif text-sm sm:text-base font-bold tracking-widest text-[#332C25] uppercase">
              House of Sanatana
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-[#8F6E5B] hidden sm:block">
              Sacred Customer Sanctum
            </p>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#8F6E5B] hover:text-[#B33927] transition-colors py-1.5 px-3 rounded-full hover:bg-[#FDF2F2] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C7833D] hover:bg-[#B08A4A] py-1.5 px-4 rounded-full transition-all shadow-sm cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}

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
        {/* SIDEBAR NAVIGATION (Desktop & Tablet)                     */}
        {/* ======================================================== */}
        <aside
          className={`md:col-span-4 lg:col-span-3 bg-[#FFFFFF] border border-[#D9C6A8]/70 rounded-3xl p-6 shadow-[0_8px_30px_rgba(51,44,37,0.05)] transition-all md:sticky md:top-24 ${
            isMobileMenuOpen ? 'block mb-4' : 'hidden md:block'
          }`}
        >
          {/* Circular Brand Emblem / Avatar */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-[#D9C6A8]/40">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full border-2 border-[#C7833D]/40 p-1 shadow-inner bg-[#F7F1E5]">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="House of Sanatana"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F7F1E5] via-[#EFE8DA] to-[#D9C6A8] flex items-center justify-center text-[#C7833D] font-serif text-2xl font-bold shadow-sm">
                    ॐ
                  </div>
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#3E7C59] border-2 border-white flex items-center justify-center text-[10px] text-white">
                ✓
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg text-[#332C25]">
              {customer?.displayName || 'Devoted Sadhaka'}
            </h3>
            <p className="text-xs text-[#8F6E5B] font-dm truncate max-w-[200px] mt-0.5">
              {customer?.emailAddress?.emailAddress || (isAuthenticated ? 'Shopify Verified' : 'Guest Account')}
            </p>

            {isAuthenticated && (
              <span className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-dm uppercase tracking-widest text-[#3E7C59] bg-[#EBF5EE] border border-[#B9E0C7] px-2.5 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="w-3 h-3" />
                Verified Devotee
              </span>
            )}
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
                  className={`relative w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#C7833D] bg-[#FBF4EA] border border-[#D9C6A8]/70 shadow-sm'
                      : 'text-[#8F6E5B] hover:text-[#332C25] hover:bg-[#F7F1E5]/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C7833D]' : 'text-[#8F6E5B]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C7833D] text-white font-bold">
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

          {/* Quick Info & Sign Out Footer */}
          <div className="mt-8 pt-6 border-t border-[#D9C6A8]/40 space-y-3">
            <div className="p-3 rounded-xl bg-[#F7F1E5]/60 border border-[#D9C6A8]/40 text-center">
              <span className="text-[11px] text-[#8F6E5B] font-dm block">
                Consecrated Customer Sanctum
              </span>
              <span className="text-[10px] text-[#C7833D] font-dm uppercase tracking-widest font-semibold">
                Shopify OIDC Protected
              </span>
            </div>

            {isAuthenticated && (
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#8F6E5B] hover:text-[#B33927] hover:bg-[#FDF2F2] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </aside>

        {/* ======================================================== */}
        {/* MAIN CONTENT AREA WITH MOTION PANEL TRANSITIONS          */}
        {/* ======================================================== */}
        <main className="md:col-span-8 lg:col-span-9 min-h-[550px] relative">
          {!isAuthenticated && !isLoading ? (
            /* Unauthenticated Prompt */
            <div className="bg-[#FFFFFF] border border-[#D9C6A8] rounded-3xl p-8 sm:p-12 text-center shadow-[0_10px_35px_rgba(51,44,37,0.06)] max-w-xl mx-auto my-6">
              <div className="w-16 h-16 rounded-full bg-[#F7F1E5] border border-[#C7833D]/40 text-[#C7833D] flex items-center justify-center mx-auto mb-5 shadow-inner">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#332C25] font-normal mb-3">
                Welcome to Sacred Sanctum
              </h2>
              <p className="text-sm text-[#8F6E5B] font-dm leading-relaxed mb-8">
                Sign in with your verified Shopify account to view your consecrated orders, manage sacred addresses, and access customized devotional services.
              </p>
              <button
                type="button"
                onClick={onLogin}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-white font-dm text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <LogIn className="w-4 h-4" />
                <span>Enter Sacred Portal (Shopify Login)</span>
              </button>
            </div>
          ) : (
            /* Animated Panel Switcher using Motion */
            <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.div
                  key="orders-panel"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <OrdersPanel 
                    orders={customer?.orders?.nodes || []} 
                    isLoading={isLoading} 
                  />
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  key="profile-panel"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProfilePanel 
                    customer={customer} 
                    onUpdateProfile={onUpdateProfile} 
                  />
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings-panel"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SettingsPanel 
                    onLogout={onLogout} 
                    customerEmail={customer?.emailAddress?.emailAddress} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};
