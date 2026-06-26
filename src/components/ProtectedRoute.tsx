import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Simple auth check via localStorage token
  const isAuthenticated = !!localStorage.getItem("authToken");

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}