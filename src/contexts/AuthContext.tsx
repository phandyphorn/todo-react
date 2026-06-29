import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type {
  User,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/user";
import { useUser, useLogin, useLogout, useRegister } from "../hooks/useAuth";

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(() =>
    localStorage.getItem("authToken"),
  );

  const { data, isLoading, error, refetch } = useUser();
  const user = data?.data || null;

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();

  const login = async (payload: LoginPayload) => {
    const response = await loginMutation.mutateAsync(payload);
    localStorage.setItem("authToken", response.token);
    setAuthToken(response.token);
    return response;
  };

  const register = async (payload: RegisterPayload) => {
    const response = await registerMutation.mutateAsync(payload);
    localStorage.setItem("authToken", response.token);
    setAuthToken(response.token);
    return response;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  // Keep user query in sync with token changes
  useEffect(() => {
    if (authToken) {
      refetch();
    }
  }, [authToken, refetch]);

  const value: AuthContextType = {
    user,
    authToken,
    isLoading: isLoading && !!authToken,
    isAuthenticated: !!authToken,
    error: error as Error | null,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
