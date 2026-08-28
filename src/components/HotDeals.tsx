import React, { useState, useEffect } from "react";

const deals = [
  {
    id: 1,
    title: "Samsung Galaxy S24 Ultra",
    price: "₦1,150,000",
    badge: "HOT",
    category: "phone",
  },
  {
    id: 2,
    title: 'MacBook Pro 14" M3 Pro',
    price: "₦2,450,000",
    badge: "HOT",
    category: "laptop",
  },
  {
    id: 3,
    title: "ASUS ROG Strix G16 RTX 4070",
    price: "₦1,850,000",
    badge: "HOT",
    category: "gaming",
  },
  {
    id: 4,
    title: "AirPods Pro (2nd Gen)",
    price: "₦185,000",
    badge: "HOT",
    category: "audio",
  },
  {
    id: 5,
    title: "iPad Pro 11-inch M4",
    price: "₦1,350,000",
    badge: "HOT",
    category: "tablet",
  },
  {
    id: 6,
    title: "Apple Watch Ultra 2",
    price: "₦950,000",
    badge: "HOT",
    category: "wearables",
  },
  {
    id: 7,
    title: "Sony WH-1000XM5",
    price: "₦420,000",
    badge: "HOT",
    category: "audio",
  },
  {
    id: 8,
    title: "Dell XPS 15 OLED",
    price: "₦2,100,000",
    badge: "HOT",
    category: "laptop",
  },
];

export const HotDeals: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  // Exact 3 minutes and 30 seconds interval (210,000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 4) % deals.length);
    }, 210000);

    return () => clearInterval(timer);
  }, []);

  const visibleDeals = Array.from({ length: 4 }, (_, i) => 
    deals[(startIndex + i) % deals.length]
  );

  return (
    <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <h2 className="text-sm font-black tracking-wider text-indigo-900 uppercase">
          HOT DEALS
        </h2>
      </div>

      {/* Product Grid - Fixed slot keys [0,1,2,3] prevent unwanted flip re-triggers */}
      <div className="grid grid-cols-2 gap-3">
        {visibleDeals.map((deal, slotIndex) => (
          <div
            key={slotIndex}
            className="flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-50/80 p-3 border border-slate-100/80 hover:shadow-md transition-all duration-300"
          >
            {/* Hot Badge */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase shadow-sm">
                <span>🔥</span> HOT
              </span>
            </div>

            {/* Product Icon / Placeholder */}
            <div className="my-6 flex items-center justify-center text-indigo-400">
              <div className="h-10 w-10 rounded-lg border-2 border-indigo-400/60" />
            </div>

            {/* Product Info */}
            <div>
              <p className="line-clamp-1 text-xs font-bold text-slate-900">
                {deal.title}
              </p>
              <p className="mt-1 text-xs font-black text-indigo-950">
                {deal.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <button className="mt-4 w-full rounded-full border border-slate-200 py-2.5 text-xs font-black tracking-wider text-slate-900 uppercase transition-colors hover:bg-slate-50">
        SEE ALL
      </button>
    </div>
  );
};

export default HotDeals;