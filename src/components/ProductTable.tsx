import { IProduct } from '@/types/product';
import ProductRow from './ProductRow';
import TableHeader from './TableHeader';

interface ProductTableProps {
  products: IProduct[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHeader />
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
