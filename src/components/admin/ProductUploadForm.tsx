import React, { useState } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { marketplaceCategories } from '../../data';
import { uploadImage } from '../../lib/supabase';
import { useAppContext } from '../../store/AppContext';
import { Product } from '../../types';

export type FormState = {
  name: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  isNew: boolean;
  isTrending: boolean;
  colors: string[];
};

export const AVAILABLE_COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Orange', 'Grey', 'Brown', 'Silver', 'Gold'];

export const emptyForm = (): FormState => ({
  name: '',
  category: marketplaceCategories.find((c) => !c.isService)?.name || '',
  price: '',
  description: '',
  images: [],
  isNew: false,
  isTrending: false,
  colors: [],
});

interface ProductUploadFormProps {
  editingId: string | null;
  initialForm: FormState;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProductUploadForm: React.FC<ProductUploadFormProps> = ({ editingId, initialForm, onClose, onSuccess }) => {
  const { addProduct, updateProduct } = useAppContext();
  const [form, setForm] = useState<FormState>(initialForm);
  const [formError, setFormError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setFormError('Enter a valid price in Naira.');
      return;
    }
    if (form.images.length === 0 && selectedFiles.length === 0) {
      setFormError('At least one image is required.');
      return;
    }

    setIsUploading(true);
    setFormError('');

    try {
      const uploadedUrls: string[] = [...form.images];
      
      for (const file of selectedFiles) {
        try {
          const url = await uploadImage(file);
          if (url) {
            uploadedUrls.push(url);
          }
        } catch (err: any) {
          throw new Error(`Upload failed: ${err.message || 'Unknown error'}`);
        }
      }

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price,
        description: form.description.trim() || 'Premium listing from Joe Tech.',
        images: uploadedUrls,
        isNew: form.isNew,
        isTrending: form.isTrending,
        colors: form.colors.length > 0 ? form.colors : undefined,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }

      onSuccess();
    } catch (error: any) {
      setFormError(error.message || 'Failed to publish product. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed Background Overlay */}
      <div 
        className="absolute inset-0 bg-white dark:bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Sliding Drawer */}
      <form
        onSubmit={handlePublish}
        className="relative w-full md:w-[600px] h-full bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col transform transition-transform duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/10 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-800 dark:text-white">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-500 dark:text-gray-400 dark:text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-800 dark:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          {formError && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg px-4 py-3 flex items-center">
              <span className="mr-2">⚠️</span> {formError}
            </p>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider text-xs">Product Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-[#3626a7] focus:ring-2 focus:ring-[#3626a7]/20 transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider text-xs">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-[#3626a7] focus:ring-2 focus:ring-[#3626a7]/20 transition-all shadow-sm"
                >
                  {marketplaceCategories
                    .filter((c) => !c.isService)
                    .map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider text-xs">Price (₦)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-[#3626a7] focus:ring-2 focus:ring-[#3626a7]/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="flex gap-6 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 p-4 rounded-xl shadow-sm">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isTrending}
                  onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
                  className="w-4 h-4 brand-text rounded border-gray-300 focus:ring-[#3626a7]"
                />
                Trending
              </label>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider text-xs">Colors</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-[#3626a7] focus:ring-2 focus:ring-[#3626a7]/20 transition-all shadow-sm text-left flex justify-between items-center"
                >
                  <span className="truncate">
                    {form.colors.length > 0 ? form.colors.join(', ') : 'Select colors...'}
                  </span>
                  <span className="text-gray-400 text-xs">▼</span>
                </button>
                {isColorDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto p-2 custom-scrollbar">
                    {AVAILABLE_COLORS.map(c => (
                      <label key={c} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-[#222] rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={form.colors.includes(c)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setForm({ ...form, colors: [...form.colors, c] });
                            } else {
                              setForm({ ...form, colors: form.colors.filter(col => col !== c) });
                            }
                          }}
                          className="w-4 h-4 brand-text rounded border-gray-300 focus:ring-[#3626a7]"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider text-xs">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-[#3626a7] focus:ring-2 focus:ring-[#3626a7]/20 transition-all shadow-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider text-xs">Product Images (Max 5)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-[#1a1a1a] text-center transition-colors hover:bg-gray-100 dark:hover:bg-[#222]">
                <UploadCloud size={32} className="brand-text mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-800 dark:text-white mb-4 font-medium">Click to select files from your device</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const totalImages = form.images.length + selectedFiles.length + files.length;
                    if (totalImages > 5) {
                      setFormError('Maximum 5 images allowed per product.');
                      return;
                    }
                    setFormError('');
                    setSelectedFiles((prev) => [...prev, ...files]);
                  }}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#3626a7] file:text-white hover:file:bg-[#281c7d] cursor-pointer transition-colors"
                />
                
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {form.images.map((url, idx) => (
                    <div key={`existing-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {selectedFiles.map((file, idx) => (
                    <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-[#3626a7] shadow-sm group">
                      <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-white/10 flex justify-end space-x-4 bg-gray-50 dark:bg-[#0f0f0f] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-[#222] transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-3 bg-[#3626a7] hover:bg-[#281c7d] text-white rounded-xl text-sm font-bold flex items-center space-x-2 disabled:opacity-50 shadow-md shadow-[#3626a7]/20 transition-colors focus:outline-none"
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{editingId ? 'Save Changes' : 'Publish Product'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
