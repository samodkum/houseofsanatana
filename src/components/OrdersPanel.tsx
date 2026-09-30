import React from 'react';
import { ShoppingBag, PackageCheck, Clock, ExternalLink, Sparkles } from 'lucide-react';
import { CustomerOrderNode } from '../hooks/useCustomer';

interface OrdersPanelProps {
  orders?: CustomerOrderNode[];
  isLoading?: boolean;
}

export const OrdersPanel: React.FC<OrdersPanelProps> = ({ orders = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-[#D9C6A8]/30 rounded-lg w-48"></div>
        <div className="h-4 bg-[#D9C6A8]/20 rounded-md w-72"></div>
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-[#FFFFFF] border border-[#D9C6A8]/40 rounded-2xl p-6"></div>
          ))}
        </div>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return isoString;
    }
  };

  const formatCurrency = (amount: string, currencyCode: string) => {
    try {
      const num = parseFloat(amount);
      if (currencyCode === 'INR') {
        return `₹${num.toLocaleString('en-IN')}`;
      }
      return `${currencyCode} ${num.toFixed(2)}`;
    } catch {
      return `${currencyCode} ${amount}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#D9C6A8]/40 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C7833D] font-dm text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Purchases</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#332C25] font-normal tracking-wide">
            Your Orders & Offerings
          </h2>
          <p className="text-sm text-[#8F6E5B] font-dm mt-1">
            View consecrated pooja kits, deity idols, and sacred yatra reservations.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E5] border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B]">
          <ShoppingBag className="w-3.5 h-3.5 text-[#C7833D]" />
          <span>{orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Placed</span>
        </div>
      </div>

      {/* Orders List or Empty State */}
      {orders.length === 0 ? (
        <div className="text-center py-16 px-6 bg-[#FFFFFF] border border-[#D9C6A8]/50 rounded-2xl shadow-[0_4px_20px_rgba(143,110,91,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#F7F1E5] border border-[#D9C6A8] flex items-center justify-center mx-auto mb-4 text-[#C7833D]">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif text-[#332C25] mb-2">No Sacred Orders Yet</h3>
          <p className="text-sm text-[#8F6E5B] max-w-md mx-auto mb-6 font-dm">
            You haven't placed any devotional orders or sanctum bookings yet. Explore our consecrated collection to invite divine grace into your abode.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-[#F7F1E5] font-dm text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow"
          >
            <span>Explore Sacred Mall</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const fulfillmentStatus = order.fulfillments?.[0]?.displayStatus || 'Processing';
            const isDelivered = fulfillmentStatus.toLowerCase().includes('delivered');

            return (
              <div
                key={order.id || order.name}
                className="group bg-[#FFFFFF] border border-[#D9C6A8]/60 hover:border-[#C7833D]/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_16px_rgba(51,44,37,0.04)] hover:shadow-[0_8px_24px_rgba(199,131,61,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* Left: Order Info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-dm font-bold text-base text-[#332C25]">
                      {order.name}
                    </span>
                    <span className="text-[#D9C6A8]">•</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#8F6E5B] font-dm">
                      <Clock className="w-3.5 h-3.5 text-[#C7833D]" />
                      {formatDate(order.processedAt)}
                    </span>
                  </div>

                  {/* Line items snippet if available */}
                  {order.lineItems?.nodes && order.lineItems.nodes.length > 0 && (
                    <div className="text-xs text-[#8F6E5B] font-dm line-clamp-1">
                      {order.lineItems.nodes.map((item, idx) => (
                        <span key={idx}>
                          {item.title} (x{item.quantity})
                          {idx < (order.lineItems?.nodes.length ?? 0) - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Status & Total */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#D9C6A8]/30 pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-[#8F6E5B] uppercase tracking-wider font-dm font-medium">
                      Total Amount
                    </div>
                    <div className="text-lg font-serif font-bold text-[#332C25]">
                      {formatCurrency(order.totalPrice.amount, order.totalPrice.currencyCode)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-dm font-medium border ${
                        isDelivered
                          ? 'bg-[#EBF5EE] text-[#3E7C59] border-[#B9E0C7]'
                          : 'bg-[#FBF4EA] text-[#C7833D] border-[#EADFCF]'
                      }`}
                    >
                      {isDelivered ? (
                        <PackageCheck className="w-3.5 h-3.5 text-[#3E7C59]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#C7833D] animate-ping"></span>
                      )}
                      <span>{fulfillmentStatus}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
