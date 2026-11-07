import React, { useEffect, useState } from 'react';
import {
  User,
  Package,
  Calendar,
  LogOut,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  MapPin,
  Compass,
  Edit3,
  Check,
  X,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  AlertCircle,
  Heart
} from 'lucide-react';
import { SunIcon } from '../components/SunIcon';
import { HOS_LOGO_URL } from '../lib/constants';

interface OrderLineItem {
  title: string;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice?: {
    amount: string;
    currencyCode: string;
  };
  lineItems?: OrderLineItem[];
}

interface Address {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zoneCode?: string;
  zip?: string;
  countryCode?: string;
  phoneNumber?: string;
}

interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  emailAddress: string;
  phoneNumber?: string;
  defaultAddress?: Address | null;
  addresses?: Address[];
  orders: Order[];
}

interface AccountPageProps {
  onNavigateHome: () => void;
  onNavigateMall?: () => void;
  onNavigateTravel?: () => void;
  onNavigateJoin?: () => void;
  onNavigateMedia?: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

// Detect whether an item is a Travel Yatra / Expedition or a Temple Product
function isTravelTitle(title?: string): boolean {
  if (!title) return false;
  const lower = title.toLowerCase();
  const travelKeywords = [
    'yatra',
    'expedition',
    'kailash',
    'chardham',
    'char dham',
    'shaktipeeth',
    'shakti peeth',
    'jyotirlinga',
    'braj',
    'varanasi',
    'kashi',
    'pilgrimage',
    'circuit',
    'tour',
    'sanctum pass',
    'darshan pass',
    'mansarovar',
    'kedarnath',
    'badrinath',
    'gangotri',
    'yamunotri',
    'kamakhya',
    'somnath',
    'mahakaleshwar'
  ];
  return travelKeywords.some(keyword => lower.includes(keyword));
}

function getOrderCategory(order: Order): 'travel' | 'product' {
  const hasTravel = order.lineItems?.some(item => isTravelTitle(item.title)) || isTravelTitle(order.name);
  return hasTravel ? 'travel' : 'product';
}

export const AccountPage: React.FC<AccountPageProps> = ({
  onNavigateHome,
  onNavigateMall,
  onNavigateTravel,
  onNavigateJoin,
  onNavigateMedia,
  onOpenCart,
  onOpenWishlist,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Main Tabs: 'orders' | 'profile'
  const [activeMainTab, setActiveMainTab] = useState<'orders' | 'profile'>('orders');

  // Sub-filter for Orders: 'all' | 'products' | 'travel'
  const [orderCategoryFilter, setOrderCategoryFilter] = useState<'all' | 'products' | 'travel'>('all');

  // Inline Name Editing State
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editLastName, setEditLastName] = useState<string>('');
  const [isSavingName, setIsSavingName] = useState<boolean>(false);
  const [nameSaveFeedback, setNameSaveFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCustomer() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch customer data from Express backend proxy
        const res = await fetch('/api/customer', {
          credentials: 'include',
        });

        // Target Flow Requirement: If 401, redirect to /auth/login
        if (res.status === 401) {
          window.location.href = '/auth/login';
          return;
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with ${res.status}`);
        }

        const data: CustomerProfile = await res.json();
        if (isMounted) {
          setCustomer(data);
          setEditFirstName(data.firstName || '');
          setEditLastName(data.lastName || '');
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Failed to load customer profile:', err);
          setError(err.message || 'Could not load your account details.');
          setIsLoading(false);
        }
      }
    }

    loadCustomer();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFirstName.trim() && !editLastName.trim()) {
      setNameSaveFeedback({ type: 'error', message: 'Name cannot be completely empty.' });
      return;
    }

    setIsSavingName(true);
    setNameSaveFeedback(null);

    try {
      const res = await fetch('/api/customer/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: editFirstName.trim(),
          lastName: editLastName.trim(),
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to update name.');
      }

      setCustomer(prev => {
        if (!prev) return null;
        return {
          ...prev,
          firstName: editFirstName.trim(),
          lastName: editLastName.trim(),
          displayName: `${editFirstName.trim()} ${editLastName.trim()}`.trim() || prev.displayName,
        };
      });

      setNameSaveFeedback({ type: 'success', message: 'Name updated successfully!' });
      setIsEditingName(false);
      setTimeout(() => setNameSaveFeedback(null), 4000);
    } catch (err: any) {
      console.error('Error saving name:', err);
      setNameSaveFeedback({ type: 'error', message: err.message || 'Could not save changes.' });
    } finally {
      setIsSavingName(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const formatPrice = (amount?: string, currency?: string) => {
    if (!amount) return '—';
    const num = parseFloat(amount);
    const curr = currency || 'INR';
    if (isNaN(num)) return `${curr} ${amount}`;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Filter orders by category
  const allOrders = customer?.orders || [];
  const productOrders = allOrders.filter(o => getOrderCategory(o) === 'product');
  const travelOrders = allOrders.filter(o => getOrderCategory(o) === 'travel');

  // Extract human-friendly name (never say Namaste to an email address)
  const customerFriendlyName = React.useMemo(() => {
    if (!customer) return 'Sadhaka';
    if (customer.firstName && customer.firstName.trim()) {
      return `${customer.firstName} ${customer.lastName || ''}`.trim();
    }
    // If displayName exists and is NOT an email address:
    if (customer.displayName && !customer.displayName.includes('@') && customer.displayName.trim()) {
      return customer.displayName.trim();
    }
    // Extract friendly name assumed from email
    if (customer.emailAddress) {
      const username = customer.emailAddress.split('@')[0] || '';
      const clean = username.replace(/[0-9]/g, '').replace(/[._-]+/g, ' ').trim();
      if (clean) {
        return clean
          .split(' ')
          .filter(Boolean)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
      }
      const raw = username.split(/[._-]/)[0];
      if (raw) return raw.charAt(0).toUpperCase() + raw.slice(1);
    }
    return 'Sadhaka';
  }, [customer]);

  const filteredOrders =
    orderCategoryFilter === 'products' ? productOrders :
      orderCategoryFilter === 'travel' ? travelOrders :
        allOrders;

  return (
    <div className="min-h-screen bg-[#FEFBF2] text-[#221508] font-dm selection:bg-[#C59239]/20 selection:text-[#221508] pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#FEFBF2]/95 backdrop-blur-md border-b border-[#C59239]/30 px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

          {/* Left: Clearance for floating Hamburger Menu (pl-14 sm:pl-16) + Smart Back Button */}
          <div className="flex items-center gap-2 pl-14 sm:pl-16">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.history.length > 1) {
                  window.history.back();
                } else {
                  onNavigateHome();
                }
              }}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#221508] text-[#3D2619] hover:text-[#FEFBF2] border border-[#C59239]/40 hover:border-[#221508] text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Return to previous section"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Back to Store</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>

          {/* Center Brand Identity */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            title="House of Sanatana Home"
          >
            <img
              src={HOS_LOGO_URL}
              alt="House of Sanatana"
              className="w-8 h-8 rounded-full object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-dm font-bold text-base sm:text-lg text-[#221508] tracking-tight">
              ॥ साधना खाता ॥
            </span>
          </div>

          {/* Right Action Controls: Quick Navigation, Wishlist, Basket, and Sign Out */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Wishlist Button */}
            {onOpenWishlist && (
              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#98555E] text-[#98555E] hover:text-white border border-[#C59239]/30 transition-all shadow-xs cursor-pointer active:scale-95"
                title="Sacred Wishlist"
                aria-label="Open sacred wishlist"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#98555E] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            {/* Sacred Basket / Cart Button */}
            {onOpenCart && (
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#FE7613] text-[#FE7613] hover:text-white border border-[#C59239]/30 transition-all shadow-xs cursor-pointer active:scale-95"
                title="Sacred Basket"
                aria-label="Open sacred basket"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FE7613] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Sign Out Button */}
            <a
              href="/auth/logout"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#98555E] text-[#98555E] hover:text-white border border-[#C59239]/30 hover:border-[#98555E] text-xs font-semibold transition-all shadow-xs active:scale-95"
              title="Sign out of your account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-14 h-14 rounded-full border-3 border-[#C59239]/20 border-t-[#C59239] animate-spin flex items-center justify-center overflow-hidden">
              <img
                src={HOS_LOGO_URL}
                alt="Loading"
                className="w-8 h-8 rounded-full object-contain"
              />
            </div>
            <p className="font-dm text-sm sm:text-base text-[#3D2619]/80 font-medium">
              Loading your sacred profile & orders...
            </p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-[#C59239]/30 text-center shadow-lg">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-dm font-bold text-xl text-[#98555E] mb-2">
              Unable to Retrieve Profile
            </h2>
            <p className="text-sm text-[#3D2619] mb-6 leading-relaxed">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/auth/login"
                className="px-6 py-2.5 rounded-full bg-[#FE7613] hover:bg-[#E0640A] text-white text-xs font-bold transition-all shadow-xs"
              >
                Re-authenticate
              </a>
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-6 py-2.5 rounded-full bg-white border border-[#C59239]/40 hover:bg-stone-50 text-xs font-bold text-[#221508] transition-all"
              >
                Go to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Feedback notification toast */}
            {nameSaveFeedback && (
              <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${nameSaveFeedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                {nameSaveFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="text-xs font-medium">{nameSaveFeedback.message}</span>
              </div>
            )}

            {/* Customer Profile Banner */}
            <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#073863] via-[#0A4C83] to-[#073863] text-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(7,56,99,0.3)] border border-[#C59239]">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-[#C59239]/20 blur-2xl pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#C59239] to-[#E4B968] p-0.5 shadow-xl shrink-0 overflow-hidden flex items-center justify-center bg-[#1A1612]/60">
                    <img
                      src={HOS_LOGO_URL}
                      alt="House of Sanatana Brand Logo"
                      className="w-full h-full rounded-[14px] object-contain p-1"
                    />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C59239]/25 border border-[#E4B968]/50 text-[#E4B968] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                      <img
                        src={HOS_LOGO_URL}
                        alt="Logo"
                        className="w-3.5 h-3.5 rounded-full object-contain"
                      />
                      <span>॥ कुल भूषण ॥ Consecrated Sadhaka</span>
                    </div>

                    <h1 className="font-dm font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      नमस्ते, {customerFriendlyName}
                    </h1>

                    <p className="text-xs sm:text-sm text-[#FEFBF2]/80 mt-1 flex flex-wrap items-center gap-2">
                      <span>{customer?.emailAddress}</span>
                      {customer?.phoneNumber && (
                        <>
                          <span>•</span>
                          <span>{customer.phoneNumber}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Quick Profile Stat Badges */}
                <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                  <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/15 text-center flex-1 md:flex-initial">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[#E4B968]/90">
                      Products
                    </span>
                    <span className="font-dm font-bold text-lg text-white">
                      {productOrders.length}
                    </span>
                  </div>

                  <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/15 text-center flex-1 md:flex-initial">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[#E4B968]/90">
                      Yatras
                    </span>
                    <span className="font-dm font-bold text-lg text-[#FE7613]">
                      {travelOrders.length}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Tabs Navigation Bar: Orders vs Profile */}
            <div className="flex items-center gap-3 border-b border-[#C59239]/30 pb-1">
              <button
                type="button"
                onClick={() => setActiveMainTab('orders')}
                className={`relative pb-3 px-4 font-dm font-semibold text-base sm:text-lg transition-all cursor-pointer flex items-center gap-2 ${activeMainTab === 'orders'
                  ? 'text-[#221508]'
                  : 'text-[#3D2619]/70 hover:text-[#221508]'
                  }`}
              >
                <Package className="w-5 h-5 text-[#FE7613]" />
                <span>My Orders & Bookings ({allOrders.length})</span>
                {activeMainTab === 'orders' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FE7613] rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveMainTab('profile')}
                className={`relative pb-3 px-4 font-dm font-semibold text-base sm:text-lg transition-all cursor-pointer flex items-center gap-2 ${activeMainTab === 'profile'
                  ? 'text-[#221508]'
                  : 'text-[#3D2619]/70 hover:text-[#221508]'
                  }`}
              >
                <User className="w-5 h-5 text-[#0A4C83]" />
                <span>Personal Profile & Details</span>
                {activeMainTab === 'profile' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A4C83] rounded-full" />
                )}
              </button>
            </div>

            {/* TAB 1: ORDERS & CATEGORIES */}
            {activeMainTab === 'orders' && (
              <section className="space-y-6">
                {/* Categorization Controls: All vs Products vs Travel Packages */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 bg-[#FEFBF2] p-1.5 rounded-2xl border border-[#C59239]/30">
                    <button
                      type="button"
                      onClick={() => setOrderCategoryFilter('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${orderCategoryFilter === 'all'
                        ? 'bg-[#0A4C83] text-white shadow-xs'
                        : 'text-[#3D2619]/80 hover:text-[#221508]'
                        }`}
                    >
                      All Sacred Acquisitions ({allOrders.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderCategoryFilter('products')}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${orderCategoryFilter === 'products'
                        ? 'bg-[#FE7613] text-white shadow-xs'
                        : 'text-[#3D2619]/80 hover:text-[#221508]'
                        }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Temple Products ({productOrders.length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderCategoryFilter('travel')}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${orderCategoryFilter === 'travel'
                        ? 'bg-[#607427] text-white shadow-xs'
                        : 'text-[#3D2619]/80 hover:text-[#221508]'
                        }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Sacred Yatras ({travelOrders.length})</span>
                    </button>
                  </div>

                  {/* Quick Browse Buttons in Header */}
                  <div className="flex items-center gap-3">
                    {onNavigateMall && (
                      <button
                        type="button"
                        onClick={onNavigateMall}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FE7613] hover:text-[#98555E] transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Browse Mall</span>
                      </button>
                    )}
                    {onNavigateTravel && (
                      <button
                        type="button"
                        onClick={onNavigateTravel}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#607427] hover:text-[#221508] transition-colors cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore Yatras</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length > 0 ? (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => {
                      const isTravel = getOrderCategory(order) === 'travel';

                      return (
                        <div
                          key={order.id}
                          className="bg-white rounded-2xl border border-[#C59239]/30 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
                        >
                          {/* Order Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C59239]/20 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isTravel
                                ? 'bg-[#607427]/15 border-[#607427]/30 text-[#607427]'
                                : 'bg-[#FE7613]/15 border-[#FE7613]/30 text-[#FE7613]'
                                }`}>
                                {isTravel ? <Compass className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-dm font-bold text-base text-[#221508]">
                                    Order {order.name}
                                  </span>
                                  {isTravel && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#607427]/15 text-[#607427] border border-[#607427]/30">
                                      Sacred Yatra Booking
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-[#3D2619]/70 flex items-center gap-1.5 mt-0.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {formatDate(order.processedAt)}
                                </span>
                              </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${order.financialStatus === 'PAID'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border-amber-200'
                                  }`}
                              >
                                {order.financialStatus}
                              </span>

                              {/* Only show fulfillment/delivery status for physical products, never for experiential travel packages */}
                              {isTravel ? (
                                order.financialStatus === 'PAID' && (
                                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider bg-[#0A4C83]/15 text-[#0A4C83] border-[#0A4C83]/30">
                                    Confirmed Booking
                                  </span>
                                )
                              ) : (
                                order.fulfillmentStatus && (
                                  <span
                                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${order.fulfillmentStatus === 'FULFILLED'
                                      ? 'bg-[#607427]/15 text-[#607427] border-[#607427]/30'
                                      : 'bg-stone-100 text-stone-700 border-stone-200'
                                      }`}
                                  >
                                    {order.fulfillmentStatus}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Line Items List */}
                          {order.lineItems && order.lineItems.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {order.lineItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-xs py-1 text-[#3D2619]"
                                >
                                  <span className="font-medium text-[#221508] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59239]" />
                                    {item.title}
                                  </span>
                                  <span className="font-mono text-[#3D2619] bg-[#FEFBF2] px-2 py-0.5 rounded border border-[#C59239]/30">
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Order Footer with Total Price */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#C59239]/20 text-xs">
                            <span className="font-semibold text-[#3D2619]/80">
                              Total Sanctified Amount
                            </span>
                            <span className="font-dm font-bold text-base text-[#221508]">
                              {formatPrice(order.totalPrice?.amount, order.totalPrice?.currencyCode)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty state for selected category */
                  <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#C59239]/30 shadow-xs">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30 flex items-center justify-center text-[#C59239]">
                      {orderCategoryFilter === 'travel' ? (
                        <Compass className="w-7 h-7 text-[#607427]" />
                      ) : (
                        <ShoppingBag className="w-7 h-7 text-[#FE7613]" />
                      )}
                    </div>

                    <h3 className="font-dm font-bold text-lg sm:text-xl text-[#221508] mb-2">
                      {orderCategoryFilter === 'travel'
                        ? 'No Sacred Yatra Expeditions Booked'
                        : orderCategoryFilter === 'products'
                          ? 'No Consecrated Temple Offerings Yet'
                          : 'No Sacred Orders or Bookings Yet'}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#3D2619]/80 max-w-md mx-auto mb-6 leading-relaxed">
                      {orderCategoryFilter === 'travel'
                        ? 'You have not booked any Himalayan, Char Dham, or Jyotirlinga pilgrimages yet. Begin your transformative spiritual yatra.'
                        : 'Explore our Consecrated Temple Mall for pure Vedic puja kits, sacred brass idols, incense, and certified offerings.'}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* TAB 2: PERSONAL PROFILE & SAVED ADDRESSES */}
            {activeMainTab === 'profile' && (
              <section className="space-y-6">

                {/* 1. Identity & Name Editing Card */}
                <div className="bg-white rounded-3xl border border-[#C59239]/30 p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#C59239]/20 pb-4 mb-6">
                    <div>
                      <h2 className="font-dm font-bold text-lg sm:text-xl text-[#221508]">
                        Sadhaka Personal Identity
                      </h2>
                      <p className="text-xs text-[#3D2619]/80 mt-0.5">
                        Your registered Vedic profile name, contact parameters, and Sangha credentials
                      </p>
                    </div>

                    {!isEditingName && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingName(true);
                          setEditFirstName(customer?.firstName || '');
                          setEditLastName(customer?.lastName || '');
                          setNameSaveFeedback(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FEFBF2] hover:bg-[#0A4C83] text-[#221508] hover:text-white border border-[#C59239]/40 hover:border-[#0A4C83] text-xs font-bold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Name</span>
                      </button>
                    )}
                  </div>

                  {/* Name Edit Form */}
                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className="p-5 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30 space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="font-dm font-bold text-xs uppercase tracking-wider text-[#3D2619]">
                          Update Your Sacred Name
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsEditingName(false)}
                          className="text-stone-400 hover:text-stone-600 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#221508] mb-1.5">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#FE7613] focus:ring-1 focus:ring-[#FE7613] text-sm text-[#221508] outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#221508] mb-1.5">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#FE7613] focus:ring-1 focus:ring-[#FE7613] text-sm text-[#221508] outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingName(false)}
                          disabled={isSavingName}
                          className="px-4 py-2 rounded-full bg-white border border-[#C59239]/30 text-xs font-semibold text-[#3D2619] hover:bg-stone-50 cursor-pointer"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isSavingName}
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#FE7613] to-[#FE8D3B] hover:brightness-105 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                        >
                          {isSavingName ? (
                            <>
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : null}

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="p-4 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3D2619]/70 mb-1">
                        Full Name
                      </span>
                      <span className="font-dm font-bold text-base text-[#221508] block">
                        {customerFriendlyName}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3D2619]/70 mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#0A4C83]" />
                        Email Address
                      </span>
                      <span className="font-dm font-medium text-sm text-[#221508] block truncate">
                        {customer?.emailAddress || '—'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3D2619]/70 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#607427]" />
                        Phone Contact
                      </span>
                      <span className="font-dm font-medium text-sm text-[#221508] block">
                        {customer?.phoneNumber || 'Not provided'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Saved Delivery & Consecration Addresses Card */}
                <div className="bg-white rounded-3xl border border-[#C59239]/30 p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#C59239]/20 pb-4 mb-6">
                    <div>
                      <h2 className="font-dm font-bold text-lg sm:text-xl text-[#221508] flex items-center gap-2">
                        <Home className="w-5 h-5 text-[#C59239]" />
                        Saved Consecration & Delivery Address
                      </h2>
                      <p className="text-xs text-[#3D2619]/80 mt-0.5">
                        Address where consecrated kits, yatra passes, and sacred offerings are dispatched
                      </p>
                    </div>
                  </div>

                  {customer?.defaultAddress || (customer?.addresses && customer.addresses.length > 0) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customer.addresses && customer.addresses.length > 0 ? (
                        customer.addresses.map((addr, idx) => (
                          <div
                            key={addr.id || idx}
                            className="p-5 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30 relative"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#C59239] bg-white px-2.5 py-0.5 rounded-full border border-[#C59239]/30">
                                <MapPin className="w-3 h-3" />
                                {idx === 0 ? 'Primary Sanctum Address' : `Address #${idx + 1}`}
                              </span>
                            </div>

                            <div className="font-dm text-xs text-[#221508] space-y-1 mt-3 leading-relaxed">
                              {addr.address1 && <p className="font-semibold text-sm">{addr.address1}</p>}
                              {addr.address2 && <p>{addr.address2}</p>}
                              <p>
                                {[addr.city, addr.zoneCode, addr.zip].filter(Boolean).join(', ')}
                              </p>
                              {addr.countryCode && <p className="font-medium text-[#3D2619]">{addr.countryCode}</p>}
                              {addr.phoneNumber && <p className="text-[#3D2619]">Phone: {addr.phoneNumber}</p>}
                            </div>
                          </div>
                        ))
                      ) : customer.defaultAddress ? (
                        <div className="p-5 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#C59239] bg-white px-2.5 py-0.5 rounded-full border border-[#C59239]/30 mb-3">
                            <MapPin className="w-3 h-3" />
                            Primary Sanctum Address
                          </span>
                          <div className="font-dm text-xs text-[#221508] space-y-1 leading-relaxed">
                            {customer.defaultAddress.address1 && <p className="font-semibold text-sm">{customer.defaultAddress.address1}</p>}
                            {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                            <p>
                              {[customer.defaultAddress.city, customer.defaultAddress.zoneCode, customer.defaultAddress.zip].filter(Boolean).join(', ')}
                            </p>
                            {customer.defaultAddress.countryCode && <p className="font-medium text-[#3D2619]">{customer.defaultAddress.countryCode}</p>}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    /* Dignified Empty Address State */
                    <div className="p-6 rounded-2xl bg-[#FEFBF2] border border-dashed border-[#C59239]/40 text-center">
                      <MapPin className="w-8 h-8 text-[#C59239]/60 mx-auto mb-2" />
                      <h4 className="font-dm font-bold text-base text-[#221508] mb-1">
                        No Saved Delivery Address on File
                      </h4>
                      <p className="text-xs text-[#3D2619]/80 max-w-md mx-auto mb-4 leading-relaxed">
                        Your delivery address will be automatically captured and linked to your sacred account whenever you checkout your first temple offering.
                      </p>
                      {onNavigateMall && (
                        <button
                          type="button"
                          onClick={onNavigateMall}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FE7613] to-[#FE8D3B] hover:brightness-105 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Browse Temple Offerings</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>
        )}
      </main>
    </div>
  );
};
