'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function TableHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || 'asc';

  function handleSort(field: string) {
    const params = new URLSearchParams(searchParams.toString());
    const newOrder = currentSort === field && currentOrder === 'asc' ? 'desc' : 'asc';
    params.set('sort', field);
    params.set('order', newOrder);
    params.set('page', '1');
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <thead>
      <tr className="border-b border-gray-100">
        <th className="w-12 py-3 pl-4">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
          <button
            onClick={() => handleSort('name')}
            className={`flex items-center gap-1 transition-colors hover:text-gray-900 ${
              currentSort === 'name' ? 'font-semibold text-indigo-600' : ''
            }`}
          >
            Produto
            <svg
              className={`h-3 w-3 transition-transform ${
                currentSort === 'name' && currentOrder === 'desc' ? 'rotate-180 text-indigo-600' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </button>
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
          <button
            onClick={() => handleSort('description')}
            className={`flex items-center gap-1 transition-colors hover:text-gray-900 ${
              currentSort === 'description' ? 'font-semibold text-indigo-600' : ''
            }`}
          >
            Descrição
            <svg
              className={`h-3 w-3 transition-transform ${
                currentSort === 'description' && currentOrder === 'desc' ? 'rotate-180 text-indigo-600' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </button>
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
          <button
            onClick={() => handleSort('price')}
            className={`flex items-center gap-1 transition-colors hover:text-gray-900 ${
              currentSort === 'price' ? 'font-semibold text-indigo-600' : ''
            }`}
          >
            Preço (Kz)
            <svg
              className={`h-3 w-3 transition-transform ${
                currentSort === 'price' && currentOrder === 'desc' ? 'rotate-180 text-indigo-600' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </button>
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
          <button
            onClick={() => handleSort('stock')}
            className={`flex items-center gap-1 transition-colors hover:text-gray-900 ${
              currentSort === 'stock' ? 'font-semibold text-indigo-600' : ''
            }`}
          >
            Estoque
            <svg
              className={`h-3 w-3 transition-transform ${
                currentSort === 'stock' && currentOrder === 'desc' ? 'rotate-180 text-indigo-600' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </button>
        </th>
        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
          Ações
        </th>
      </tr>
    </thead>
  );
}
