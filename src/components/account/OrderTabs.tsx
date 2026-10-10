import React from 'react';
import { Package, Compass } from 'lucide-react';

export type OrderTabType = 'products' | 'travel';

interface OrderTabsProps {
  activeTab: OrderTabType;
  onChange: (tab: OrderTabType) => void;
  productCount?: number;
  travelCount?: number;
}

export const OrderTabs: React.FC<OrderTabsProps> = ({
  activeTab,
  onChange,
  productCount,
  travelCount,
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-1.5 bg-[#F4EDE0] rounded-2xl border border-[#DECDB8] max-w-md w-full">
      {/* Product Purchases Tab */}
      <button
        type="button"
        onClick={() => onChange('products')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeTab === 'products'
            ? 'bg-[#58111A] text-white shadow-md'
            : 'text-[#5A4D41] hover:text-[#26201B] hover:bg-white/60'
        }`}
      >
        <Package className={`w-4 h-4 ${activeTab === 'products' ? 'text-[#D9C6A8]' : 'text-[#8F6E5B]'}`} />
        <span>Product Purchases</span>
        {productCount !== undefined && (
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === 'products'
                ? 'bg-white/20 text-white'
                : 'bg-[#DECDB8] text-[#5A4D41]'
            }`}
          >
            {productCount}
          </span>
        )}
      </button>

      {/* Travel Packages Tab */}
      <button
        type="button"
        onClick={() => onChange('travel')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeTab === 'travel'
            ? 'bg-[#C7833D] text-white shadow-md'
            : 'text-[#5A4D41] hover:text-[#26201B] hover:bg-white/60'
        }`}
      >
        <Compass className={`w-4 h-4 ${activeTab === 'travel' ? 'text-white' : 'text-[#C7833D]'}`} />
        <span>Travel Packages</span>
        {travelCount !== undefined && (
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === 'travel'
                ? 'bg-white/25 text-white'
                : 'bg-[#DECDB8] text-[#5A4D41]'
            }`}
          >
            {travelCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default OrderTabs;
