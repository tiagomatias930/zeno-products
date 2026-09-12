import { Suspense } from 'react';
import Header from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import ProductTable from '@/components/ProductTable';
import Pagination from '@/components/Pagination';
import { getProducts } from '@/lib/api';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;
  const search = typeof params.search === 'string' ? params.search : '';

  const response = await getProducts(page, pageSize);

  // Client-side search filtering
  const filtered = search
    ? response.data.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      )
    : response.data;

  return (
    <main className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <Suspense fallback={null}>
            <Toolbar />
          </Suspense>

          <div className="mt-4">
            <ProductTable products={filtered} />
          </div>

          <div className="mt-4">
            <Suspense fallback={null}>
              <Pagination
                total={response.pagination.total}
                currentPage={response.pagination.currentPage}
                totalPages={response.pagination.totalPages}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
