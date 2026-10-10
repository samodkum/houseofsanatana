import React, { useState, useEffect } from 'react';
import { CustomerOrder, GET_CUSTOMER_ORDERS } from '../../api/customerOrders';
import { loginCustomer } from '../../lib/customerAuth';
import { OrderTabs, OrderTabType } from '../../components/account/OrderTabs';
import { OrderList } from '../../components/account/OrderList';
import { ArrowLeft, Loader2, RefreshCw, AlertCircle, ShieldCheck, LogIn } from 'lucide-react';

interface OrdersPageProps {
  onBack?: () => void;
  onExploreProducts?: () => void;
  onExploreTravel?: () => void;
}

// Fallback demo orders for testing when offline / backend proxy is not authenticated yet
const SAMPLE_MOCK_ORDERS: CustomerOrder[] = [
  {
    id: 'gid://shopify/Order/5829104812',
    name: '#HOS-1082',
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    financialStatus: 'PAID',
    fulfillmentStatus: 'FULFILLED',
    tags: ['consecrated-puja', 'brass-vigraha'],
    totalPrice: {
      amount: '4999.00',
      currencyCode: 'INR',
    },
    lineItems: {
      nodes: [
        {
          title: 'Handcrafted Brass Pancha Aarti & Akhand Deepa',
          quantity: 1,
          image: {
            url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=400',
            altText: 'Brass Pancha Aarti',
          },
          variant: {
            title: 'Pure Brass',
            price: { amount: '2499.00', currencyCode: 'INR' },
            product: { productType: 'Daily Sadhana', tags: ['brass'] },
          },
        },
        {
          title: 'Varanasi Peetham Sandalwood & Camphor Samagri Kit',
          quantity: 1,
          image: {
            url: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80&w=400',
            altText: 'Sandalwood Samagri Kit',
          },
          variant: {
            title: 'Grand Samagri Pack',
            price: { amount: '2500.00', currencyCode: 'INR' },
            product: { productType: 'Samagri', tags: ['havan'] },
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Order/5829109431',
    name: '#YATRA-8401',
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    financialStatus: 'CONFIRMED',
    fulfillmentStatus: 'SCHEDULED',
    tags: ['travel-package', 'jyotirlinga', 'sacred-yatra'],
    totalPrice: {
      amount: '28500.00',
      currencyCode: 'INR',
    },
    lineItems: {
      nodes: [
        {
          title: '12 Jyotirlinga Darshan — Kashi, Somnath & Ujjain Yatra',
          quantity: 1,
          image: {
            url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=400',
            altText: 'Jyotirlinga Darshan',
          },
          variant: {
            title: 'Deluxe Heritage Pilgrim Suite (5N / 6D)',
            price: { amount: '28500.00', currencyCode: 'INR' },
            product: { productType: 'Sacred Travel', tags: ['travel-package'] },
          },
        },
      ],
    },
  },
];

export default function OrdersPage({
  onBack,
  onExploreProducts,
  onExploreTravel,
}: OrdersPageProps) {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [tab, setTab] = useState<OrderTabType>('products');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUsingMock, setIsUsingMock] = useState<boolean>(false);
  const [isUnauthenticated, setIsUnauthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsUnauthenticated(false);
    try {
      // Call Railway backend proxy which hits Shopify Customer Account API
      const res = await fetch('https://houseofsanatana-production.up.railway.app/api/customer/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query: GET_CUSTOMER_ORDERS }),
      });
      
      if (res.status === 401) {
        setIsUnauthenticated(true);
        throw new Error('Customer is not logged in');
      }

      if (!res.ok) {
        throw new Error(`Proxy returned status ${res.status}`);
      }

      const json = await res.json();
      const orderNodes = json?.data?.customer?.orders?.nodes || json?.orders;
      if (orderNodes && Array.isArray(orderNodes)) {
        setOrders(orderNodes);
        setIsUsingMock(false);
      } else {
        throw new Error('Invalid orders response format');
      }
    } catch (err: any) {
      console.warn('Orders fetch note:', err.message);
      // Fallback to sample mock orders so UI remains demonstrable and interactive
      setOrders(SAMPLE_MOCK_ORDERS);
      setIsUsingMock(true);
      setErrorMessage(
        isUnauthenticated
          ? 'You are not logged in. Sign in with your Shopify Customer Account to view your live orders.'
          : 'Showing demo preview. Authenticate via Shopify Customer API to view your live orders.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by tag:
  // Product orders are those that DO NOT contain "travel-package" or "sacred-yatra"
  const productOrders = orders.filter(
    (o) =>
      !o.tags?.some(
        (t) =>
          t.toLowerCase().includes('travel-package') ||
          t.toLowerCase().includes('sacred-yatra') ||
          t.toLowerCase().includes('travel')
      )
  );

  // Travel orders are those that contain "travel-package" or "travel" / "sacred-yatra"
  const travelOrders = orders.filter((o) =>
    o.tags?.some(
      (t) =>
        t.toLowerCase().includes('travel-package') ||
        t.toLowerCase().includes('sacred-yatra') ||
        t.toLowerCase().includes('travel')
    )
  );

  const activeOrders = tab === 'products' ? productOrders : travelOrders;

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#26201B] font-dm py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white border border-[#DECDB8] flex items-center justify-center text-[#5A4D41] hover:text-[#26201B] hover:bg-[#F4EDE0] transition-all cursor-pointer shadow-xs"
                title="Go Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#58111A]/10 text-[#58111A] text-[10px] font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Sadhaka Account</span>
              </div>
              <h1 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#26201B]">
                Your Sacred Orders & Yatras
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => loginCustomer('/orders')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#58111A] text-white text-xs font-semibold hover:bg-[#430c13] transition-all shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#D9C6A8]" />
              <span>Sign In to Account</span>
            </button>

            <button
              type="button"
              onClick={fetchOrders}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#DECDB8] text-xs font-semibold text-[#5A4D41] hover:text-[#26201B] hover:bg-stone-50 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Unauthenticated / Preview Mode Banner */}
        {isUsingMock && (
          <div className="mb-6 p-4 rounded-2xl bg-[#F7F1E5] border border-[#DECDB8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#C7833D]/15 text-[#C7833D] flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-dm font-bold text-xs sm:text-sm text-[#26201B]">
                  {isUnauthenticated ? 'Customer Login Required' : 'Demo Preview Mode'}
                </h4>
                <p className="font-dm text-xs text-[#8F6E5B] mt-0.5 max-w-xl leading-relaxed">
                  {isUnauthenticated
                    ? 'Orders in Shopify are private to each individual customer. Sign in with your Shopify customer email to load your live orders.'
                    : errorMessage}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => loginCustomer('/orders')}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#58111A] text-white text-xs font-bold hover:bg-[#430c13] transition-all shadow-sm cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#D9C6A8]" />
              <span>Sign In with Shopify</span>
            </button>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="mb-6">
          <OrderTabs
            activeTab={tab}
            onChange={setTab}
            productCount={productOrders.length}
            travelCount={travelOrders.length}
          />
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 text-[#C7833D] animate-spin mb-3" />
            <p className="text-xs text-[#8F6E5B] font-medium">
              Retrieving your sacred orders from Shopify...
            </p>
          </div>
        ) : (
          <OrderList
            orders={activeOrders}
            emptyCategoryTitle={tab === 'products' ? 'product purchases' : 'travel packages'}
            onExploreClick={tab === 'products' ? onExploreProducts : onExploreTravel}
          />
        )}
      </div>
    </div>
  );
}

export { OrdersPage };
