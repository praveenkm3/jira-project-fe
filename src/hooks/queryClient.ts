import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failCount: number, error: Error) => {
        if (error?.response?.status === 401) {
          return false;
        }
        return failCount < 2;
      },
    },
  },
});
export default queryClient;
