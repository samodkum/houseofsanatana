import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  User, 
  Settings, 
  LogOut, 
  LogIn,
  ArrowLeft, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck,
  CheckCircle,
  Clock,
  Compass
} from 'lucide-react';
import { OrdersPanel } from './OrdersPanel';
import { YatrasPanel, SAMPLE_YATRAS } from './YatrasPanel';
import { ProfilePanel } from './ProfilePanel';
import { SettingsPanel } from './SettingsPanel';
import { CustomerData, useCustomer } from '../hooks/useCustomer';
import { getStoredCustomerData, clearStoredCustomerAuth } from '../lib/shopify';

export type AccountTab = 'orders' | 'yatras' | 'profile' | 'settings';

export const SAMPLE_CUSTOMER: CustomerData = {
  id: 'gid://shopify/Customer/79445164163',
  displayName: 'Devoted Sadhaka',
  firstName: 'Devoted',
  lastName: 'Sadhaka',
  emailAddress: {
    emailAddress: 'devotee@houseofsanatana.in',
  },
  phoneNumber: {
    phoneNumber: '+91 98765 43210',
  },
  orders: {
    nodes: [
      {
        id: 'gid://shopify/Order/1001',
        name: '#HOS-1084',
        processedAt: '2026-03-24T10:30:00Z',
        financialStatus: 'PAID',
        totalPrice: {
          amount: '4999.00',
          currencyCode: 'INR',
        },
        fulfillments: [
          { displayStatus: 'Delivered to Sanctum' }
        ],
        lineItems: {
          nodes: [
            { title: 'Kashi Vishwanath Consecrated Rudraksha Mala (108 Beads)', quantity: 1 },
            { title: 'Sacred Bhasma & Sandalwood Incense Offering', quantity: 2 }
          ]
        }
      },
      {
        id: 'gid://shopify/Order/1002',
        name: '#HOS-1042',
        processedAt: '2026-03-12T14:15:00Z',
        financialStatus: 'PAID',
        totalPrice: {
          amount: '12499.00',
          currencyCode: 'INR',
        },
        fulfillments: [
          { displayStatus: 'In Transit — Dispatched via Sacred Courier' }
        ],
        lineItems: {
          nodes: [
            { title: 'Kedarnath Sanctum Brass Pooja Thali & Diya Kit', quantity: 1 }
          ]
        }
      }
    ]
  }
};

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
  isLoading: propIsLoading = false,
  activeTab: controlledTab,
  onTabChange,
  onUpdateProfile: propUpdateProfile,
  onLogout,
  onBackToStore,
  logoUrl,
}) => {
  const { customer: hookCustomer, isLoading: hookLoading, logout: hookLogout } = useCustomer();
  const [internalTab, setInternalTab] = useState<AccountTab>('orders');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic customer resolver: live Shopify customer > propCustomer > localStorage > fallback
  const getResolvedCustomer = (): CustomerData => {
    if (hookCustomer?.emailAddress?.emailAddress) return hookCustomer;
    if (propCustomer?.emailAddress?.emailAddress) return propCustomer;
    
    const stored = getStoredCustomerData();
    if (stored?.email) {
      return {
        id: stored.id,
        displayName: stored.displayName || `${stored.firstName || ''} ${stored.lastName || ''}`.trim() || stored.email,
        firstName: stored.firstName || '',
        lastName: stored.lastName || '',
        emailAddress: { emailAddress: stored.email },
        phoneNumber: stored.phone ? { phoneNumber: stored.phone } : undefined,
        orders: { nodes: [] }
      };
    }
    return SAMPLE_CUSTOMER;
  };

  const [activeCustomer, setActiveCustomer] = useState<CustomerData>(getResolvedCustomer);

  useEffect(() => {
    const resolved = getResolvedCustomer();
    setActiveCustomer(resolved);
  }, [hookCustomer, propCustomer]);

  const activeTab = controlledTab || internalTab;

  const isAuthenticated = !!(
    (hookCustomer?.emailAddress?.emailAddress) || 
    (propCustomer?.emailAddress?.emailAddress) || 
    (getStoredCustomerData()?.email)
  );

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
    setActiveCustomer(prev => ({
      ...prev,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`.trim(),
    }));
    return { success: true };
  };

  const handleLogoutAction = async () => {
    clearStoredCustomerAuth();
    if (onLogout) {
      await onLogout();
    } else {
      await hookLogout();
    }
  };

  const productOrdersCount = (activeCustomer?.orders?.nodes || []).filter((order) => {
    const isYatra = order.name.toLowerCase().includes('ytr') || 
      order.lineItems?.nodes?.some(item => item.title.toLowerCase().includes('yatra') || item.title.toLowerCase().includes('pilgrimage'));
    return !isYatra;
  }).length;

  const navItems: Array<{ id: AccountTab; label: string; icon: React.ElementType; badge?: number }> = [
    { 
      id: 'orders', 
      label: 'Products Purchased', 
      icon: ShoppingBag, 
      badge: productOrdersCount 
    },
    { 
      id: 'yatras', 
      label: 'Travel Packages', 
      icon: Compass, 
      badge: SAMPLE_YATRAS.length 
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
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogoutAction}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#8F6E5B] hover:text-[#B33927] transition-colors py-1.5 px-3.5 rounded-full hover:bg-[#FDF2F2] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <a
              href="/auth/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white bg-gradient-to-r from-[#C7833D] to-[#8F6E5B] font-semibold py-1.5 px-4 rounded-full shadow-xs hover:brightness-105 transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In with Shopify</span>
            </a>
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
        {/* SIDEBAR NAVIGATION                                       */}
        {/* ======================================================== */}
        <aside
          className={`md:col-span-4 lg:col-span-3 bg-[#FFFFFF] border border-[#D9C6A8]/70 rounded-3xl p-6 shadow-[0_8px_30px_rgba(51,44,37,0.05)] transition-all md:sticky md:top-24 ${
            isMobileMenuOpen ? 'block mb-4' : 'hidden md:block'
          }`}
        >
          {/* Devotee Info */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-[#D9C6A8]/40">
            <h3 className="font-serif font-bold text-lg text-[#332C25]">
              {isAuthenticated ? activeCustomer.displayName : 'Devoted Sadhaka'}
            </h3>
            <p className="text-xs text-[#8F6E5B] font-dm truncate max-w-[200px] mt-0.5">
              {isAuthenticated ? activeCustomer.emailAddress?.emailAddress : 'Connect your sacred account'}
            </p>

            {isAuthenticated ? (
              <span className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-dm uppercase tracking-widest text-[#3E7C59] bg-[#EBF5EE] border border-[#B9E0C7] px-2.5 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="w-3 h-3" />
                Verified Devotee
              </span>
            ) : (
              <a
                href="/auth/login"
                className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#8F6E5B] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Shopify</span>
              </a>
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

          {/* Sign Out / Sign In Footer */}
          <div className="mt-8 pt-6 border-t border-[#D9C6A8]/40">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogoutAction}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#8F6E5B] hover:text-[#C7833D] hover:bg-[#FBF4EA] border border-transparent hover:border-[#C7833D]/40 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Dashboard</span>
              </button>
            ) : (
              <a
                href="/auth/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C7833D] to-[#8F6E5B] shadow-sm hover:brightness-105 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Shopify</span>
              </a>
            )}
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
                  orders={activeCustomer.orders?.nodes || []} 
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
                  yatras={SAMPLE_YATRAS}
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
                  customer={activeCustomer} 
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
                  customerEmail={activeCustomer.emailAddress?.emailAddress} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
