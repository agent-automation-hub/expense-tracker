import { cache } from "react"

import { TRPCError, initTRPC } from "@trpc/server"

import { db } from "@/lib/db"
import { createClient } from "@/lib/supabase/server"

export const createTRPCContext = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return {
    db,
    supabase,
    user,
  }
})

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create()

export const createCallerFactory = t.createCallerFactory
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
