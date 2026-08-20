import React from 'react';
import { Product } from '../../types';
import { formatPrice } from '../../data';
import { motion } from 'motion/react';
import { ShoppingBag, Zap, MessageCircle } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { ProductImage } from '../ui/ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProductId, setCurrentView, addToCart } = useAppContext();

  const handleView = () => {
    setActiveProductId(product.id);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || '',
      selectedColor: product.colors?.[0] || '',
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between cursor-pointer rounded-2xl border border-jt-ink/10 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-jt-blue/40 hover:shadow-xl hover:shadow-jt-blue/10 dark:border-white/10 dark:bg-jt-ink/50"
      onClick={handleView}
    >
      <div>
        {/* Product Media Box */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5">
          {/* Status Badges */}
          {product.isNew && (
            <div className="absolute left-2.5 top-2.5 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-jt-blue px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                <Zap className="h-3 w-3 fill-current" /> New
              </span>
            </div>
          )}

          {/* Product Image */}
          <div className="h-full w-full transform transition-transform duration-500 group-hover:scale-105">
            <ProductImage
              src={product.images?.[0]}
              alt={product.name}
              icon={product.icon}
              seed={product.id}
              className="h-full w-full object-contain p-4"
              iconClassName="h-12 w-12 text-jt-blue/40 dark:text-jt-mint/40"
            />
          </div>

          {/* Hover Quick Action Strip */}
          <div className="absolute inset-x-2 bottom-2 z-20 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button 
              type="button"
              onClick={handleQuickAdd}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-jt-ink px-3 py-2.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-jt-blue dark:bg-white dark:text-jt-ink dark:hover:bg-jt-mint"
              title="Add to cart"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add to Cart</span>
            </button>

            <a
              href={`https://wa.me/2348133727813?text=${encodeURIComponent(`Hello Joe Tech, I want to inquire about ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="grid h-9 w-9 place-items-center rounded-xl bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebd5a]"
              title="Ask on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
            </a>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3 px-1">
          {product.category && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-jt-ink/50 dark:text-jt-steel">
              {product.category}
            </p>
          )}

          <h3 className="line-clamp-2 text-sm font-bold text-jt-ink transition-colors group-hover:text-jt-blue dark:text-white dark:group-hover:text-jt-mint">
            {product.name}
          </h3>

          {product.specs && (
            <p className="mt-1 line-clamp-1 text-xs text-jt-ink/60 dark:text-jt-steel">
              {product.specs}
            </p>
          )}
        </div>
      </div>

      {/* Pricing & Stock Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-jt-ink/5 px-1 pt-2.5 dark:border-white/5">
        <p className="font-tech text-base font-bold text-jt-blue dark:text-jt-mint">
          {formatPrice(product.price)}
        </p>

        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          In Stock
        </span>
      </div>
    </motion.div>
  );
};