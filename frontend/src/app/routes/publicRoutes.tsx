import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const LoginPage = lazy(() =>
  import("../../features/auth/pages/login-page").then((m) => ({
    default: m.LoginPage,
  })),
);

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];
