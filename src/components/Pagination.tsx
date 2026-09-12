'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface PaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ total, currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  // Generate page numbers to display
  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }

    return pages.filter((p) => typeof p === 'number' && p >= 1 && p <= totalPages);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
      <p className="text-sm text-indigo-600 font-medium">
        Total: {total} {total === 1 ? 'item' : 'itens'}
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Anterior
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`dots-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isPending}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages || isPending}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Próxima
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
