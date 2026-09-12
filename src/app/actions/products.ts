'use server';

import { createProduct, updateProduct, deleteProduct } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createProductAction(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);

  await createProduct({ name, description, price, stock });
  revalidatePath('/');
}

export async function updateProductAction(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);

  await updateProduct(id, { name, description, price, stock });
  revalidatePath('/');
}

export async function deleteProductAction(id: string) {
  await deleteProduct(id);
  revalidatePath('/');
}
