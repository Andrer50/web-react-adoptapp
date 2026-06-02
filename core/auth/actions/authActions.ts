import { apiClient } from "@/lib/http-client";
import { RegisterRequest, RegisterResponse } from "@/core/auth/interfaces";

export const registerAction = async (request: RegisterRequest): Promise<RegisterResponse> => {
  return apiClient.post<RegisterResponse, RegisterRequest>("usuarios/", request);
};
