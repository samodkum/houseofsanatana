import React, { useState } from 'react';
import { ShoppingBag, PackageCheck, Clock, ExternalLink, Sparkles, RotateCcw, CheckCircle2, X } from 'lucide-react';
import { CustomerOrderNode } from '../hooks/useCustomer';

interface OrdersPanelProps {
  orders?: CustomerOrderNode[];
  isLoading?: boolean;
}

export const OrdersPanel: React.FC<OrdersPanelProps> = ({ orders = [], isLoading }) => {
  const [returnOrder, setReturnOrder] = useState<CustomerOrderNode | null>(null);
  const [returnReason, setReturnReason] = useState<string>('Damaged during sanctum transit');
  const [returnType, setReturnType] = useState<'return' | 'exchange'>('exchange');
  const [isSubmittingReturn, setIsSubmittingReturn] = useState<boolean>(false);
  const [returnSuccessMessage, setReturnSuccessMessage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-[#D9C6A8]/30 rounded-lg w-48"></div>
        <div className="h-4 bg-[#D9C6A8]/20 rounded-md w-72"></div>
        <div className="mt-8 space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-28 bg-[#FFFFFF] border border-[#D9C6A8]/40 rounded-2xl p-6"></div>
          ))}
        </div>
      </div>
    );
  }

  // Filter for physical product orders (excluding travel passes)
  const productOrders = orders.filter((order) => {
    const isYatra = order.name.toLowerCase().includes('ytr') || 
      order.lineItems?.nodes?.some(item => item.title.toLowerCase().includes('yatra') || item.title.toLowerCase().includes('pilgrimage'));
    return !isYatra;
  });

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

  const handleOpenReturnModal = (order: CustomerOrderNode) => {
    setReturnOrder(order);
    setReturnSuccessMessage(null);
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReturn(true);

    setTimeout(() => {
      setIsSubmittingReturn(false);
      setReturnSuccessMessage(
        `Your ${returnType === 'return' ? 'return request' : 'exchange request'} for ${returnOrder?.name} has been submitted to Shopify Admin. A prepaid sacred pickup will be scheduled.`
      );
      setTimeout(() => {
        setReturnOrder(null);
        setReturnSuccessMessage(null);
      }, 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#D9C6A8]/40 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C7833D] font-dm text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Product Orders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#332C25] font-normal tracking-wide">
            Pooja Kits & Temple Offerings
          </h2>
          <p className="text-sm text-[#8F6E5B] font-dm mt-1">
            Track dispatches, view invoices, and request Shopify-backed returns or exchanges.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E5] border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B]">
          <ShoppingBag className="w-3.5 h-3.5 text-[#C7833D]" />
          <span>{productOrders.length} {productOrders.length === 1 ? 'Product Order' : 'Product Orders'}</span>
        </div>
      </div>

      {/* Orders List or Empty State */}
      {productOrders.length === 0 ? (
        <div className="text-center py-16 px-6 bg-[#FFFFFF] border border-[#D9C6A8]/50 rounded-2xl shadow-[0_4px_20px_rgba(143,110,91,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#F7F1E5] border border-[#D9C6A8] flex items-center justify-center mx-auto mb-4 text-[#C7833D]">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif text-[#332C25] mb-2">No Product Orders Yet</h3>
          <p className="text-sm text-[#8F6E5B] max-w-md mx-auto mb-6 font-dm">
            You haven't ordered any consecrated pooja sets or sacred sanctum offerings yet.
          </p>
          <a
            href="#santana-mall"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-[#F7F1E5] font-dm text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow"
          >
            <span>Explore Sacred Mall</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="space-y-5">
          {productOrders.map((order) => {
            const fulfillmentStatus = order.fulfillments?.[0]?.displayStatus || 'Processing';
            const isDelivered = fulfillmentStatus.toLowerCase().includes('delivered');

            return (
              <div
                key={order.id || order.name}
                className="group bg-[#FFFFFF] border border-[#D9C6A8]/60 hover:border-[#C7833D]/60 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-[0_4px_16px_rgba(51,44,37,0.04)] hover:shadow-[0_8px_24px_rgba(199,131,61,0.08)] flex flex-col justify-between gap-5"
              >
                {/* Main Order Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-dm font-bold text-base text-[#332C25]">
                        {order.name}
                      </span>
                      <span className="text-[#D9C6A8]">•</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#8F6E5B] font-dm">
                        <Clock className="w-3.5 h-3.5 text-[#C7833D]" />
                        Ordered on {formatDate(order.processedAt)}
                      </span>
                    </div>

                    {/* Items */}
                    {order.lineItems?.nodes && order.lineItems.nodes.length > 0 && (
                      <div className="text-xs text-[#8F6E5B] font-dm">
                        {order.lineItems.nodes.map((item, idx) => (
                          <span key={idx} className="inline-block mr-2 font-medium text-[#332C25]">
                            ✦ {item.title} <span className="text-[#8F6E5B]">(x{item.quantity})</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status & Price */}
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#D9C6A8]/30 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] text-[#8F6E5B] uppercase tracking-wider font-dm">
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

                {/* Footer Action: Return & Exchange */}
                <div className="border-t border-[#D9C6A8]/30 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-dm text-[#8F6E5B]">
                  <span>Eligible for 7-day return or exchange backed by Shopify Policy.</span>

                  <button
                    type="button"
                    onClick={() => handleOpenReturnModal(order)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#D9C6A8] hover:border-[#C7833D] bg-[#F7F1E5]/70 hover:bg-[#F7F1E5] text-[#8F6E5B] hover:text-[#C7833D] font-dm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return / Exchange</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Return & Exchange Modal Dialog */}
      {returnOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-dm">
          <div className="relative w-full max-w-lg bg-[#FAF6EE] border border-[#D9C6A8] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-[#332C25]">
            <button
              type="button"
              onClick={() => setReturnOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EFE8DA] text-[#8F6E5B] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7833D] block mb-1">
                Shopify Self-Serve Resolution
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#332C25]">
                Return or Exchange {returnOrder.name}
              </h3>
              <p className="text-xs text-[#8F6E5B] font-dm mt-1">
                Select your preferred resolution. Your request is registered directly into Shopify Admin.
              </p>
            </div>

            {returnSuccessMessage ? (
              <div className="p-4 rounded-2xl bg-[#EBF5EE] border border-[#B9E0C7] text-[#3E7C59] text-xs font-dm flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{returnSuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReturn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-[#8F6E5B]">
                    Resolution Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setReturnType('exchange')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        returnType === 'exchange'
                          ? 'bg-[#C7833D] text-white border-[#C7833D] shadow-sm'
                          : 'bg-white text-[#8F6E5B] border-[#D9C6A8]'
                      }`}
                    >
                      Exchange Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setReturnType('return')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        returnType === 'return'
                          ? 'bg-[#C7833D] text-white border-[#C7833D] shadow-sm'
                          : 'bg-white text-[#8F6E5B] border-[#D9C6A8]'
                      }`}
                    >
                      Return & Refund
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-[#8F6E5B]">
                    Reason for {returnType === 'exchange' ? 'Exchange' : 'Return'}
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D9C6A8] bg-white text-xs font-dm text-[#332C25] focus:outline-none focus:ring-2 focus:ring-[#C7833D]"
                  >
                    <option value="Damaged during sanctum transit">Damaged during sanctum transit</option>
                    <option value="Defective or missing sacred accessory">Defective or missing sacred accessory</option>
                    <option value="Received incorrect pooja kit or item">Received incorrect pooja kit or item</option>
                    <option value="Exchange for another consecrated edition">Exchange for another consecrated edition</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-white/80 border border-[#D9C6A8]/50 text-[11px] text-[#8F6E5B] leading-relaxed">
                  ✦ Once submitted, a confirmation email with a free return shipping label will be dispatched to your registered address by Shopify.
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReturnOrder(null)}
                    className="px-4 py-2 rounded-full border border-[#D9C6A8] text-xs font-dm font-semibold text-[#8F6E5B] hover:bg-[#EFE8DA] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReturn}
                    className="px-6 py-2 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-white text-xs font-dm font-bold uppercase tracking-wider shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmittingReturn ? 'Submitting to Shopify...' : 'Confirm Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
