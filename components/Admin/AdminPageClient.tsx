'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/Admin/ProductForm';
import ProductList from '@/components/Admin/ProductList';
import ProductReorderModal from '@/components/Admin/ProductReorderModal';
import LoginForm from '@/components/Admin/LoginForm';
import LanguageSelector from '@/components/Admin/LanguageSelector';
import SettingsMenu from '@/components/Admin/SettingsMenu';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';
import { PlusIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useProducts } from '@/hooks/useProducts';

export default function AdminPageClient() {
  const router = useRouter();
  const { products, refreshProducts } = useProducts();
  const { 
    deleteProduct, 
    duplicateProduct, 
    reorderProducts,
    toggleProductVisibility,
    isAdminAuthenticated, 
    setAdminAuthenticated,
    translations 
  } = useStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);

  const handleFormComplete = async () => {
    await refreshProducts();
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDelete = async (productId: string, imagePath: string | null) => {
    await deleteProduct(productId, imagePath);
    await refreshProducts();
  };

  const handleDuplicate = async (product: Product) => {
    await duplicateProduct(product);
    await refreshProducts();
  };

  const handleReorder = async (products: Product[]) => {
    await reorderProducts(products);
    await refreshProducts();
    setShowReorderModal(false);
  };

  const handleToggleVisibility = async (product: Product) => {
    await toggleProductVisibility(product);
    await refreshProducts();
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    router.push('/');
  };

  if (!isAdminAuthenticated) {
    return <LoginForm onLogin={() => setAdminAuthenticated(true)} />;
  }

  return (
    <div className="p-8 bg-white dark:bg-zinc-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-zinc-100">
          {translations.admin.title}
        </h1>
        <div className="flex items-center gap-4">
          <SettingsMenu />
          <LanguageSelector />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {translations.admin.logout}
          </button>
        </div>
      </div>
      
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          {translations.admin.addProduct}
        </button>

        <button
          onClick={() => setShowReorderModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
        >
          <ArrowsUpDownIcon className="h-5 w-5" />
          {translations.admin.reorderProducts}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-zinc-100">
          {translations.admin.currentProducts}
        </h2>
        <ProductList
          products={products}
          onReorder={handleReorder}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onToggleVisibility={handleToggleVisibility}
        />
      </div>

      {showForm && (
        <ProductForm 
          editingProduct={editingProduct} 
          onComplete={handleFormComplete}
          onClose={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

      {showReorderModal && (
        <ProductReorderModal onClose={() => setShowReorderModal(false)} />
      )}
    </div>
  );
}