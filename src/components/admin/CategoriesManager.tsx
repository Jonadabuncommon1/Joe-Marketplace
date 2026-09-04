import React, { useState } from 'react';
import { marketplaceCategories } from '../../data';
import { useAppContext } from '../../store/AppContext';
import { GadgetIcon } from '../ui/ProductImage';

export const CategoriesManager = () => {
  const { products } = useAppContext();
  const [categories] = useState(marketplaceCategories);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Shop Categories</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Your {categories.length} fixed shop categories and how many in-stock products are in each.
            Categories themselves are set in code, not editable here, ask if you'd like a new one added.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] p-4 text-gray-900 dark:text-gray-800 dark:text-white rounded-2xl border dark:border-white/10 shadow-sm space-y-4 transition-colors duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-gray-900 dark:text-gray-100 uppercase bg-gray-50 dark:bg-white/5 border-b dark:border-white/10">
              <tr>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">In-Stock Items</th>
                <th className="px-6 py-4">Type</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${cat.gradient} text-white shadow-sm`}
                    >
                      <GadgetIcon name={cat.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-800 dark:text-white">{cat.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-800 dark:text-white max-w-xs truncate">{cat.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#000000] dark:text-gray-800 dark:text-white">
                    {cat.isService ? '—' : products.filter((p) => p.category === cat.name && p.inStock !== false).length}
                  </td>
                  <td className="px-6 py-4">
                    {cat.isService ? (
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/30">
                        Service
                      </span>
                    ) : (
                      <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200 dark:border-green-800/30">
                        Shop
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
