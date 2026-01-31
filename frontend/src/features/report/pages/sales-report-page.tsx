import { useState } from "react";
import { useSalesReport } from "../hooks/use-reports";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/button";
import { Input } from "../../../shared/components/ui/input";

export function SalesReportPage() {
  // Filtros do formulário (antes de aplicar)
  const [formFilters, setFormFilters] = useState({
    startDate: "",
    endDate: "",
    partnerId: undefined as number | undefined,
  });

  // Filtros ativos (usados na requisição)
  const [activeFilters, setActiveFilters] = useState({
    startDate: "",
    endDate: "",
    partnerId: undefined as number | undefined,
    page: 1,
    limit: 10,
  });

  const { data: salesReport, isLoading, error } = useSalesReport(activeFilters);

  const handleFilter = () => {
    setActiveFilters({
      ...formFilters,
      page: 1,
      limit: 10,
    });
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      startDate: "",
      endDate: "",
      partnerId: undefined as number | undefined,
    };
    setFormFilters(emptyFilters);
    setActiveFilters({
      ...emptyFilters,
      page: 1,
      limit: 10,
    });
  };

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
        <p className="text-red-600">Erro ao carregar relatório de vendas</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatório de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Data Inicial
              </label>
              <Input
                type="date"
                value={formFilters.startDate}
                onChange={(e) =>
                  setFormFilters({ ...formFilters, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Data Final
              </label>
              <Input
                type="date"
                value={formFilters.endDate}
                onChange={(e) =>
                  setFormFilters({ ...formFilters, endDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                ID Parceiro
              </label>
              <Input
                type="number"
                placeholder="ID do parceiro"
                value={formFilters.partnerId || ""}
                onChange={(e) =>
                  setFormFilters({
                    ...formFilters,
                    partnerId: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={handleFilter} className="flex-1">
                Filtrar
              </Button>
              <Button onClick={handleClearFilters} variant="outline">
                Limpar
              </Button>
            </div>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total de Vendas</p>
              <p className="text-2xl font-bold text-blue-600">
                {salesReport?.totalSales || 0}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(salesReport?.totalValue || 0)}
              </p>
            </div>
          </div>

          {/* Tabela */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Parceiro</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesReport?.sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Nenhuma venda encontrada
                  </TableCell>
                </TableRow>
              ) : (
                salesReport?.sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">
                      {sale.product.name}
                    </TableCell>
                    <TableCell>{sale.partner.name}</TableCell>
                    <TableCell>{sale.customer.name}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(sale.value)}
                    </TableCell>
                    <TableCell>
                      {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Paginação */}
          {salesReport && salesReport.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">
                Página {salesReport.currentPage} de {salesReport.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    setActiveFilters({
                      ...activeFilters,
                      page: activeFilters.page - 1,
                    })
                  }
                  disabled={activeFilters.page === 1}
                  variant="outline"
                >
                  Anterior
                </Button>
                <Button
                  onClick={() =>
                    setActiveFilters({
                      ...activeFilters,
                      page: activeFilters.page + 1,
                    })
                  }
                  disabled={activeFilters.page === salesReport.totalPages}
                  variant="outline"
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
