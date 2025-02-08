import { QueryClient, QueryCache } from "react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  // here we have set the default options like refetching on window/tab focus as false.
  // and also the stale time or time after which api is refetched is 1hr
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

export default queryClient;
