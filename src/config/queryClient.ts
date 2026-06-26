import {
    QueryClient,
    type DefaultOptions,
  } from '@tanstack/react-query';
  
  const queryConfig: DefaultOptions = {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 1,
    },
  };
  
  export const queryClient = new QueryClient({
    defaultOptions: queryConfig,
  });