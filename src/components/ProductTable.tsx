import { IProduct } from '@/types/product';
import ProductRow from './ProductRow';

interface ProductTableProps {
  products: IProduct[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="w-12 py-3 pl-4">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Produto
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Descrição
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Preço (Kz)
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </button>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Estoque
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </button>
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-sm text-gray-500">
                Nenhum produto encontrado. Clique em &quot;Novo Produto&quot; para adicionar.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow key={product._id} product={product} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
