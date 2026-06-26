import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types/user";
import type {
  CreateTodoPayload,
  TodoResponse,
  TodosListResponse,
  UpdateTodoPayload,
} from "../types/todo";
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

// ✅ Always relative — always goes through Vite proxy
const API_URL = import.meta.env.VITE_API_URL || "/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - Add auth token to every request
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("logout"));
    }

    return Promise.reject(error);
  },
);

// ==================== AUTH API ====================

export const authAPI = {
  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    axiosInstance
      .post("/auth/register", {
        ...payload,
        password_confirmation: payload.password,
      })
      .then((res) => res.data),

  login: (payload: LoginPayload): Promise<AuthResponse> =>
    axiosInstance.post("/auth/login", payload).then((res) => res.data),

  logout: (): Promise<{ message: string }> =>
    axiosInstance.post("/auth/logout").then((res) => res.data),

  getCurrentUser: (): Promise<{ data: User }> =>
    axiosInstance.get("/auth/user").then((res) => res.data),
};

// ==================== TODO API ====================

export const todoAPI = {
  getTodos: (): Promise<TodosListResponse> =>
    axiosInstance.get("/todos").then((res) => res.data),

  getTodoById: (id: number): Promise<TodoResponse> =>
    axiosInstance.get(`/todos/${id}`).then((res) => res.data),

  createTodo: (payload: CreateTodoPayload): Promise<TodoResponse> =>
    axiosInstance.post("/todos", payload).then((res) => res.data),

  updateTodo: (id: number, payload: UpdateTodoPayload): Promise<TodoResponse> =>
    axiosInstance.put(`/todos/${id}`, payload).then((res) => res.data),

  deleteTodo: (id: number): Promise<{ message: string }> =>
    axiosInstance.delete(`/todos/${id}`).then((res) => res.data),
};

export default axiosInstance;
