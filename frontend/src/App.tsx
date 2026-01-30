import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/config/query-client";
import { ProtectedRoute } from "./app/routes/protected-route";
import { MainLayout } from "./layout/main-layout";
import { LoginPage } from "./features/auth/pages/login-page";
import { DashboardPage } from "./shared/components/dashboard-page";
import { UsersListPage } from "./features/user/pages/users-list-page";
import { UserFormPage } from "./features/user/pages/user-form-page";
import { ProductsListPage } from "./features/product/pages/products-list-page";
import { ProductFormPage } from "./features/product/pages/product-form-page";
import { SalesListPage } from "./features/sale/pages/sales-list-page";
import { SaleFormPage } from "./features/sale/pages/sale-form-page";
import { SalesReportPage } from "./features/report/pages/sales-report-page";
import { CommissionsReportPage } from "./features/report/pages/commissions-report-page";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UsersListPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/new"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserFormPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/:id/edit"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserFormPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProductsListPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/new"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProductFormPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:id/edit"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProductFormPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SalesListPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/sales/new"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SaleFormPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports/sales"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SalesReportPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports/commissions"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CommissionsReportPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
