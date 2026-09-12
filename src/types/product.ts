export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  statusText: string;
  data: IProduct[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

export interface ProductResponse {
  statusText: string;
  data: IProduct;
}
