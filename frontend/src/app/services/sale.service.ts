import { apiClient } from "./api";

export interface Sale {
  id: string;
  productId: string;
  partnerId: string;
  customerId: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: string;
    name: string;
    price: number;
    commission: number;
  };
  partner?: {
    id: string;
    name: string;
    email: string;
  };
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateSaleDto {
  productId: string;
  partnerId: string;
  customerId: string;
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
