'use client';

import { useTransition } from 'react';
import { deleteProductAction } from '@/app/actions/products';
import { IProduct } from '@/types/product';

interface DeleteDialogProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
}

export default function DeleteDialog({ product, open, onClose }: DeleteDialogProps) {
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  function handleDelete() {
    startTransition(async () => {
      await deleteProductAction(product._id);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">Deletar Produto</h3>
        <p className="mt-2 text-sm text-gray-500">
          Tem certeza que deseja deletar <strong>{product.name}</strong>? Esta ação não pode ser desfeita.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {isPending ? 'Deletando...' : 'Deletar'}
          </button>
        </div>
      </div>
    </div>
  );
}
