import { apiClient } from "./api";

export interface GenerateTokenDto {
  userId: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  payload: {
    sub: string;
    email: string;
    role: string;
  };
}

export const authService = {
  generateToken: async (data: GenerateTokenDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/generate-token",
      data,
    );
    return response.data;
  },
};
