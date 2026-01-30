import { useCommissionsReport } from "../hooks/use-reports";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function CommissionsReportPage() {
  const { data: commissionsReport, isLoading, error } = useCommissionsReport();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-600">Erro ao carregar relatório de comissões</p>
      </div>
    );
  }

  const totalCommissions =
    commissionsReport?.reduce(
      (acc, partner) => acc + partner.totalCommission,
      0,
    ) || 0;

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Comissões</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalCommissions)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {commissionsReport?.map((partner) => (
          <Card key={partner.partnerId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{partner.partnerName}</CardTitle>
                <p className="text-xl font-bold text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(partner.totalCommission)}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {partner.sales.map((sale) => (
                  <div
                    key={sale.saleId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="font-medium">{sale.productName}</p>
                      <p className="text-sm text-gray-600">
                        Quantidade: {sale.quantity} | Data:{" "}
                        {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <p className="font-semibold text-green-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(sale.commission)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
