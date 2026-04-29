import type { InferSelectModel } from "drizzle-orm"

import type { categories } from "@/lib/db/schema"

type DbCategory = InferSelectModel<typeof categories>

export type CategoryListItem = Pick<
  DbCategory,
  "color" | "icon" | "id" | "name" | "scope"
>
