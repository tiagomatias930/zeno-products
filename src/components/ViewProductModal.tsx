'use client';

import { useState, useEffect } from 'react';
import { IProduct } from '@/types/product';
import { getProductByIdAction } from '@/app/actions/products';

interface ViewProductModalProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
}

function formatPrice(price?: number | null): string {
  if (price === undefined || price === null || isNaN(Number(price))) return '0,00';
  const parts = Number(price).toFixed(2).split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${intPart},${parts[1]}`;
}

export default function ViewProductModal({ product: initialProduct, open, onClose }: ViewProductModalProps) {
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && initialProduct._id) {
      setProduct(initialProduct);
      setLoading(true);
      getProductByIdAction(initialProduct._id)
        .then((res) => {
          if (res?.data) setProduct(res.data);
        })
        .catch((err) => console.error('Error fetching product by id:', err))
        .finally(() => setLoading(false));
    }
  }, [open, initialProduct]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Detalhes do Produto</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Nome</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{product.name}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Descrição</p>
            <p className="mt-1 text-sm text-gray-600">{product.description || 'Sem descrição'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Preço</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">Kz {formatPrice(product.price)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Estoque</p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`}
                />
                <span className="text-sm font-medium text-gray-700">{product.stock} unidades</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
