import React from 'react';
import { CustomerOrder } from '../../api/customerOrders';
import { Package, Calendar, Clock, CheckCircle2, ChevronRight, ExternalLink, Sparkles, MapPin } from 'lucide-react';

interface OrderListProps {
  orders: CustomerOrder[];
  emptyCategoryTitle?: string;
  onExploreClick?: () => void;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  emptyCategoryTitle = 'orders',
  onExploreClick,
}) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white/70 rounded-3xl border border-[#DECDB8] shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#F4EDE0] border border-[#DECDB8] flex items-center justify-center mx-auto mb-4 text-[#8F6E5B]">
          <Package className="w-8 h-8 opacity-60" />
        </div>
        <h4 className="font-cormorant text-2xl font-bold text-[#26201B] mb-2">
          No {emptyCategoryTitle} Found
        </h4>
        <p className="font-dm text-xs text-[#8F6E5B] max-w-sm mx-auto mb-6 leading-relaxed">
          You haven't placed any {emptyCategoryTitle} yet. Your consecrated orders and sacred yatra reservations will appear here.
        </p>
        {onExploreClick && (
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#58111A] text-white text-xs font-bold hover:bg-[#430c13] transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D9C6A8]" />
            <span>Explore Offerings</span>
          </button>
        )}
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    const val = parseFloat(amount);
    if (isNaN(val)) return `${currencyCode} ${amount}`;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode || 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isTravel = order.tags?.some((t) => t.toLowerCase().includes('travel') || t.toLowerCase().includes('yatra'));
        const lineItems = order.lineItems?.nodes || [];

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-[#DECDB8] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Order Header */}
            <div className="p-4 sm:p-5 bg-[#FAF6EE] border-b border-[#EFE5D7] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isTravel ? 'bg-[#C7833D]/15 text-[#C7833D]' : 'bg-[#58111A]/10 text-[#58111A]'
                }`}>
                  {isTravel ? <MapPin className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-dm font-bold text-sm text-[#26201B]">
                      {order.name || `Order ${order.id.slice(-6)}`}
                    </span>
                    {isTravel && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C7833D]/15 text-[#C7833D] border border-[#C7833D]/30">
                        Sacred Yatra
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#8F6E5B] mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(order.processedAt)}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-[#66705A] font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.financialStatus || 'Paid / Confirmed'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-[#8F6E5B] uppercase font-bold tracking-wider">
                  Total Amount
                </div>
                <div className="font-dm font-bold text-base text-[#26201B]">
                  {formatPrice(order.totalPrice?.amount || '0', order.totalPrice?.currencyCode || 'INR')}
                </div>
              </div>
            </div>

            {/* Line Items List */}
            <div className="p-4 sm:p-5 divide-y divide-[#F4EDE0]">
              {lineItems.map((item, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.image.altText || item.title}
                        className="w-12 h-12 rounded-xl object-cover border border-[#DECDB8]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#F4EDE0] border border-[#DECDB8] flex items-center justify-center text-[#8F6E5B]">
                        <Package className="w-5 h-5 opacity-70" />
                      </div>
                    )}

                    <div>
                      <h5 className="font-dm font-medium text-xs sm:text-sm text-[#26201B]">
                        {item.title}
                      </h5>
                      <div className="text-[11px] text-[#8F6E5B] mt-0.5 flex items-center gap-2">
                        <span>Qty: {item.quantity}</span>
                        {item.variant?.title && item.variant.title !== 'Default Title' && (
                          <>
                            <span>•</span>
                            <span>{item.variant.title}</span>
                          </>
                        )}
                        {item.variant?.product?.productType && (
                          <>
                            <span>•</span>
                            <span className="italic">{item.variant.product.productType}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.variant?.price && (
                    <div className="font-dm text-xs font-semibold text-[#5A4D41] shrink-0">
                      {formatPrice(item.variant.price.amount, item.variant.price.currencyCode)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Footer with Tags / Actions */}
            <div className="px-4 py-3 bg-[#FAF6EE]/50 border-t border-[#EFE5D7] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                {order.tags && order.tags.length > 0 ? (
                  order.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-[#EFE7D8] text-[#5A4D41] text-[10px]"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-[#8F6E5B]">Consecrated Offering</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#8F6E5B]">
                  Peetham Verification: <span className="text-[#66705A] font-bold">Verified</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
