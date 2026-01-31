import { useQuery } from "@tanstack/react-query";
import { reportService } from "../../../app/services/report.service";

export function useSalesReport(params?: {
  startDate?: string;
  endDate?: string;
  partnerId?: number;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["reports", "sales", params],
    queryFn: () => reportService.getSalesReport(params),
  });
}

export function usePartnerCommissions(partnerId: number) {
  return useQuery({
    queryKey: ["reports", "partner-commissions", partnerId],
    queryFn: () => reportService.getPartnerCommissions(partnerId),
    enabled: !!partnerId,
  });
}
