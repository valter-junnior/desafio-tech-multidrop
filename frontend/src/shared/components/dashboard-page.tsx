import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAuthStore } from "../../features/auth/hooks/use-auth-store";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo, {user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-gray-600 mt-1">Visualize em Usuários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-gray-600 mt-1">Visualize em Produtos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Vendas
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-gray-600 mt-1">Visualize em Vendas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Comissões
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-gray-600 mt-1">
              Visualize em Relatórios
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Início Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-600">
                Bem-vindo ao sistema Multidrop! Use o menu lateral para navegar
                entre as funcionalidades:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  <strong>Usuários:</strong> Gerencie usuários (Admin, Parceiros
                  e Clientes)
                </li>
                <li>
                  <strong>Produtos:</strong> Cadastre e gerencie produtos com
                  preços e comissões
                </li>
                <li>
                  <strong>Vendas:</strong> Registre vendas e associe parceiros e
                  clientes
                </li>
                <li>
                  <strong>Relatórios:</strong> Visualize relatórios de vendas e
                  comissões dos parceiros
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
