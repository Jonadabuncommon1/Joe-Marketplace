import { motion } from 'motion/react';
import React, { useMemo } from 'react';
import { marketplaceCategories } from '../../data';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft } from 'lucide-react';
import { CategoryStage } from './CategoryStage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

export const CategoriesView = () => {
  const { products, setCurrentView, setActiveCategory, goBack } = useAppContext();

  // A handful of real product photos per category, in-stock ones preferred,
  // so the tile reads as a live look at what is actually for sale.
  const imagesByCategory = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const cat of marketplaceCategories) {
      const inCategory = products.filter((p) => p.category === cat.name && p.images?.length);
      const inStock = inCategory.filter((p) => p.inStock !== false);
      const pool = inStock.length > 0 ? inStock : inCategory;
      map[cat.id] = pool.flatMap((p) => p.images).slice(0, 5);
    }
    return map;
  }, [products]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent text-gray-900 dark:text-gray-100 relative transition-colors duration-500">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-start mb-6">
          <button 
            onClick={() => {
              goBack();
              window.scrollTo(0, 0);
            }} 
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-800 dark:text-white hover:brand-text transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>
        <div className="text-center mb-16">
          <h1 className="mb-4 font-display text-3xl font-semibold text-jt-ink dark:text-white md:text-5xl">
            Shop by <span className="text-gradient-brand">category</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-jt-ink/65 dark:text-jt-steel">
            Phones, laptops, gaming setups, solar power and repairs, eight departments, all tested
            and backed by our Nsukka and Ikeja branches.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {marketplaceCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl border border-jt-ink/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-jt-blue/30 hover:shadow-2xl dark:border-white/10 dark:bg-jt-ink-soft/60"
            >
              <button
                className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                onClick={() => {
                  if (category.isService) {
                    setCurrentView('services');
                  } else {
                    setActiveCategory(category.id);
                    setCurrentView('category');
                  }
                  window.scrollTo(0, 0);
                }}
                aria-label={
                  category.isService ? `Book ${category.name}` : `View ${category.name}`
                }
              />

              <div className="relative h-56 overflow-hidden [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-110">
                <CategoryStage
                  images={imagesByCategory[category.id] || []}
                  gradient={category.gradient}
                  icon={category.icon}
                  className="h-56"
                />
              </div>

              <div className="p-6">
                <h2 className="font-display text-lg font-semibold text-jt-ink dark:text-white">
                  {category.name}
                </h2>
                <p className="mb-6 mt-2 line-clamp-3 text-sm leading-relaxed text-jt-ink/60 dark:text-jt-steel">
                  {category.description}
                </p>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-jt-blue transition-colors dark:text-jt-mint">
                  <span>{category.isService ? 'Book a repair' : 'Explore products'}</span>
                  <span className="translate-x-0 transform transition-transform group-hover:translate-x-2">
                    &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
