import "server-only"

import { createCallerFactory, createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"

export const trpc = createCallerFactory(appRouter)(createTRPCContext)
