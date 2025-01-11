import { keepPreviousData, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 30,
      placeholderData: keepPreviousData,
    },
  },
});
export default queryClient;
