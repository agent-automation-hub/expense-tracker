export type TransactionListItem = {
  id: string
  type: "in" | "out"
  merchant: string | null
  note: string | null
  amount: number
  currency: string
  date: string
  createdAt: string
  src: "manual" | "ai"
  categoryId: string | null
  category: {
    id: string
    name: string
    color: string | null
    icon: string | null
  } | null
}
