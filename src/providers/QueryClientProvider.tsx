import { FC, PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as LQueryClientProvider,
  QueryCache,
} from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({}),
});

interface IQueryClientProviderProps extends PropsWithChildren {}

export const QueryClientProvider: FC<IQueryClientProviderProps> = ({
  children,
}) => {
  return (
    <LQueryClientProvider client={client}>{children}</LQueryClientProvider>
  );
};
