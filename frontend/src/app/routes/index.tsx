import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
  </div>
);

export const AppRoutes = () => {
  const routes = useRoutes([...publicRoutes, ...authRoutes]);

  return <Suspense fallback={<PageLoader />}>{routes}</Suspense>;
};