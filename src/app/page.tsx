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
  const sort = typeof params.sort === 'string' ? params.sort : '';
  const order = typeof params.order === 'string' ? params.order : 'asc';

  const response = await getProducts(page, pageSize);

  // Search filtering
  let filtered = search
    ? response.data.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      )
    : [...response.data];

  // Sorting
  if (sort) {
    filtered.sort((a, b) => {
      let valA = a[sort as keyof typeof a];
      let valB = b[sort as keyof typeof b];

      if (typeof valA === 'string') valA = (valA as string).toLowerCase();
      if (typeof valB === 'string') valB = (valB as string).toLowerCase();

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (valA < valB) return order === 'desc' ? 1 : -1;
      if (valA > valB) return order === 'desc' ? -1 : 1;
      return 0;
    });
  }

  return (
    <main className="min-h-screen bg-gray-50/50 p-3 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <Header />

        <div className="mt-6 sm:mt-8 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
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
