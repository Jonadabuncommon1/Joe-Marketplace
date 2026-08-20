import React, { useMemo, useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { useAppContext } from '../../store/AppContext';
import { formatPrice } from '../../data';
import { ProductUploadForm, FormState, emptyForm } from './ProductUploadForm';



export const ProductsManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState<FormState>(emptyForm());
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const formatWATDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Unknown';
    return d.toLocaleString('en-US', { 
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, search]);

  const openAdd = () => {
    setEditingId(null);
    setCurrentForm(emptyForm());
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setCurrentForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      images: product.images || [],
      isNew: !!product.isNew,
      isTrending: !!product.isTrending,
      colors: product.colors || [],
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSuccess = () => {
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
    closeModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove "${name}" from the marketplace?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm font-medium">
          Product saved successfully. Storefront and platform overview updated.
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Products Management</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Add, edit, or remove listings. Changes appear on the site immediately.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-[#3626a7] hover:bg-[#281c7d] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] p-4 text-gray-900 dark:text-gray-100 rounded-2xl border dark:border-white/10 shadow-sm space-y-4 transition-colors duration-500">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-800 dark:text-white" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white text-sm focus:outline-none focus:border-[#3626a7] rounded-lg transition-colors"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-gray-900 dark:text-gray-100 uppercase bg-gray-50 dark:bg-white/5 border-b dark:border-white/10">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Uploaded</th>
                <th className="px-6 py-4">Colors</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-600 dark:text-gray-300">
                    No products match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="border-b dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt="" className="w-10 h-10 rounded shadow-sm object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded shadow-sm bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-500">N/A</div>
                      )}
                      <span className="font-bold text-[#281c7d] line-clamp-1 max-w-[200px]">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 dark:text-gray-800 dark:text-white">
                      {formatWATDate(product.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      {product.colors && product.colors.length > 0 ? (
                        <div className="flex gap-1 flex-wrap max-w-[120px]">
                          {product.colors.map(c => (
                            <span key={c} className="px-2 py-1 text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                              {c}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 dark:text-gray-800 dark:text-white text-xs">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200 dark:border-green-800/30">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEdit(product)}
                        className="text-gray-400 dark:text-gray-800 dark:text-white hover:brand-text inline-flex p-1"
                        aria-label="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-gray-400 dark:text-gray-800 dark:text-white hover:text-red-500 inline-flex p-1"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProductUploadForm
          editingId={editingId}
          initialForm={currentForm}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
