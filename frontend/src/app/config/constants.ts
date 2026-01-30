export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const AUTH_TOKEN_KEY = "auth_token";
export const USER_DATA_KEY = "user_data";

export const UserRole = {
  ADMIN: "ADMIN",
  PARTNER: "PARTNER",
  CUSTOMER: "CUSTOMER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
