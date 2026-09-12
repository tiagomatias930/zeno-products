import { ProductsResponse, ProductResponse, IProduct } from '@/types/product';

const BASE_URL = 'https://backend-nodejs-q65c.onrender.com';
const USER_ID = '6aa56508fecbe690d77fad2e';

export async function getProducts(
  page: number = 1,
  pageSize: number = 10
): Promise<ProductsResponse> {
  const res = await fetch(
    `${BASE_URL}/api/products?user=${USER_ID}&page=${page}&pageSize=${pageSize}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id: string): Promise<{ statusText: string; data: IProduct }> {
  const res = await fetch(
    `${BASE_URL}/api/products/by-id?id=${id}&user=${USER_ID}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch product');
  const json = await res.json();
  const productData = Array.isArray(json.data) ? json.data[0] : json.data;
  return { ...json, data: productData };
}

export async function createProduct(
  data: Omit<IProduct, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>
): Promise<ProductResponse> {
  const res = await fetch(`${BASE_URL}/api/products?user=${USER_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, user: USER_ID }),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<IProduct, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>>
): Promise<ProductResponse> {
  const res = await fetch(
    `${BASE_URL}/api/products?id=${id}&user=${USER_ID}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/api/products?id=${id}&user=${USER_ID}`,
    { method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Failed to delete product');
}
