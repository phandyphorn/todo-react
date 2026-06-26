import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types/user";
import { authAPI } from "../api/endpoint";
import { queryClient } from "../config/queryClient";

// Get current user
export const useUser = () => {
  const token = localStorage.getItem("authToken");

  return useQuery<{ data: User }>({
    queryKey: ["user", token],
    queryFn: authAPI.getCurrentUser,
    enabled: !!token,
  });
};

// Register mutation
export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Register failed:", error.message);
    },
  });
};

// Login mutation
export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  return useMutation<{ message: string }, Error, void>({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
    },
  });
};
