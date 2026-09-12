'use client';

import { useTransition } from 'react';
import { createProductAction, updateProductAction } from '@/app/actions/products';
import { IProduct } from '@/types/product';

interface ProductModalProps {
  product?: IProduct;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, open, onClose }: ProductModalProps) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!product;

  if (!open) return null;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (isEdit && product) {
        await updateProductAction(product._id, formData);
      } else {
        await createProductAction(formData);
      }
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Nome do Produto *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={product?.name || ''}
              placeholder="Ex: Notebook UltraBook Pro"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={product?.description || ''}
              placeholder="Descrição do produto..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                Preço (Kz) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={product?.price || ''}
                placeholder="0,00"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="stock" className="mb-1 block text-sm font-medium text-gray-700">
                Estoque *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                defaultValue={product?.stock || ''}
                placeholder="0"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              {isPending ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Criar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
