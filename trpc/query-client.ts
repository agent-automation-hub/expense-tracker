import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      queries: {
        staleTime: 30 * 1000,
      },
    },
  })
}
