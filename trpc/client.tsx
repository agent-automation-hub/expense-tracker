"use client"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import "client-only"

import { makeQueryClient } from "@/trpc/query-client"
import type { AppRouter } from "@/trpc/routers/_app"

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  }

  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}

function getUrl() {
  if (typeof window !== "undefined") {
    return "/api/trpc"
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/trpc`
  }

  return "http://localhost:3000/api/trpc"
}

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
})

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client,
  queryClient: getQueryClient,
})

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  )
}
