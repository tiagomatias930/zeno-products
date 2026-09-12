'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export default function Toolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const currentPageSize = searchParams.get('pageSize') || '10';
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  // Close filters dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      params.set('page', '1');
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [searchParams, router]
  );

  // Debounced search
  function handleSearch(value: string) {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams({ search: value });
    }, 300);
  }

  function handleSort(field: string) {
    const newOrder = currentSort === field && currentOrder === 'asc' ? 'desc' : 'asc';
    updateParams({ sort: field, order: newOrder });
    setFiltersOpen(false);
  }

  function clearFilters() {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (searchParams.get('pageSize')) params.set('pageSize', searchParams.get('pageSize')!);
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
    setSearch('');
    setFiltersOpen(false);
  }

  const hasActiveFilters = !!currentSort || !!search;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, descrição..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
            </div>
          )}
        </div>

        {/* Filters dropdown */}
        <div className="relative" ref={filtersRef}>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              hasActiveFilters
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg
              className={`h-4 w-4 ${hasActiveFilters ? 'text-indigo-500' : 'text-gray-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            Filtros
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                {(currentSort ? 1 : 0) + (search ? 1 : 0)}
              </span>
            )}
            <svg
              className={`h-3 w-3 transition-transform ${filtersOpen ? 'rotate-180' : ''} ${hasActiveFilters ? 'text-indigo-400' : 'text-gray-400'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {filtersOpen && (
            <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
              <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Ordenar por
              </p>
              {[
                { field: 'name', label: 'Nome' },
                { field: 'price', label: 'Preço' },
                { field: 'stock', label: 'Estoque' },
              ].map(({ field, label }) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    currentSort === field ? 'text-indigo-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {label}
                  {currentSort === field && (
                    <svg
                      className={`h-4 w-4 transition-transform ${currentOrder === 'desc' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  )}
                </button>
              ))}

              {hasActiveFilters && (
                <>
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    onClick={clearFilters}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    Limpar filtros
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Page size */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Mostrar</span>
        <select
          value={currentPageSize}
          onChange={(e) => updateParams({ pageSize: e.target.value })}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>por página</span>
      </div>
    </div>
  );
}
