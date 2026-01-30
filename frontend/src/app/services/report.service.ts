import { apiClient } from "./api";

export interface SalesReport {
  id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  partnerName: string;
  customerName: string;
  createdAt: string;
}

export interface CommissionReport {
  partnerId: string;
  partnerName: string;
  totalCommission: number;
  sales: Array<{
    saleId: string;
    productName: string;
    quantity: number;
    commission: number;
    createdAt: string;
  }>;
}

export const reportService = {
  getSalesReport: async (): Promise<SalesReport[]> => {
    const response = await apiClient.get<SalesReport[]>("/reports/sales");
    return response.data;
  },

  getCommissions: async (): Promise<CommissionReport[]> => {
    const response = await apiClient.get<CommissionReport[]>(
      "/reports/commissions",
    );
    return response.data;
  },

  getPartnerCommissions: async (
    partnerId: string,
  ): Promise<CommissionReport> => {
    const response = await apiClient.get<CommissionReport>(
      `/partners/${partnerId}/commissions`,
    );
    return response.data;
  },
};
