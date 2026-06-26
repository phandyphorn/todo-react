import type { User } from '../types/user';
import { useUser } from './useAuth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

export const useAuthContext = (): AuthContextType => {
  const { data, isLoading, error } = useUser();
  const user = data?.data;

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error: error as Error | null,
  };
};