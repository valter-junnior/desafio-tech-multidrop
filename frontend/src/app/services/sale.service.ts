import { apiClient } from "./api";

export interface Sale {
  id: number;
  productId: number;
  partnerId: number;
  customerId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: number;
    name: string;
    price: number;
    commission: number;
  };
  partner?: {
    id: number;
    name: string;
    email: string;
  };
  customer?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateSaleDto {
  productId: number;
  partnerId: number;
  customerId: number;
  quantity: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const saleService = {
  getAll: async (): Promise<Sale[]> => {
    const response = await apiClient.get<PaginatedResponse<Sale>>("/sales");
    return response.data.data;
  },

  getById: async (id: string): Promise<Sale> => {
    const response = await apiClient.get<Sale>(`/sales/${id}`);
    return response.data;
  },

  create: async (data: CreateSaleDto): Promise<Sale> => {
    const response = await apiClient.post<Sale>("/sales", data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/sales/${id}`);
  },
};
