import { relations } from "drizzle-orm"
import {
  bigint,
  boolean,
  char,
  date,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const categoryScopeEnum = pgEnum("category_scope", [
  "expense",
  "income",
  "both",
])

export const transactionTypeEnum = pgEnum("transaction_type", [
  "expense",
  "income",
])

export const transactionStatusEnum = pgEnum("transaction_status", [
  "confirmed",
  "draft",
  "deleted",
])

export const uploadStatusEnum = pgEnum("upload_status", [
  "pending",
  "uploaded",
  "processing",
  "done",
  "failed",
])

export const extractionStatusEnum = pgEnum("extraction_status", [
  "pending",
  "completed",
  "failed",
])

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "rejected",
])

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  displayName: text("display_name"),
  defaultCurrency: char("default_currency", { length: 3 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  name: text("name").notNull(),
  scope: categoryScopeEnum("scope").notNull(),
  color: char("color", { length: 7 }),
  icon: text("icon"),
  isArchived: boolean("is_archived").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  categoryId: uuid("category_id").references(() => categories.id),
  type: transactionTypeEnum("type").notNull(),
  status: transactionStatusEnum("status").notNull().default("draft"),
  amount: numeric("amount", { precision: 18, scale: 4 }).notNull(),
  currency: char("currency", { length: 3 }).notNull(),
  date: date("date").notNull(),
  merchant: text("merchant"),
  note: text("note"),
  aiExtractionId: uuid("ai_extraction_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const uploadedFiles = pgTable("uploaded_files", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  originalFilename: text("original_filename").notNull(),
  mimeType: text("mime_type").notNull(),
  storagePath: text("storage_path").notNull(),
  fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),
  uploadStatus: uploadStatusEnum("upload_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const aiExtractions = pgTable("ai_extractions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  uploadedFileId: uuid("uploaded_file_id")
    .notNull()
    .references(() => uploadedFiles.id),
  status: extractionStatusEnum("status").notNull().default("pending"),
  rawResult: jsonb("raw_result"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const aiExtractedTransactions = pgTable("ai_extracted_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  aiExtractionId: uuid("ai_extraction_id")
    .notNull()
    .references(() => aiExtractions.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  proposedType: transactionTypeEnum("proposed_type"),
  proposedAmount: numeric("proposed_amount", { precision: 18, scale: 4 }),
  proposedCurrency: char("proposed_currency", { length: 3 }),
  proposedDate: date("proposed_date"),
  proposedMerchant: text("proposed_merchant"),
  proposedNote: text("proposed_note"),
  proposedCategoryId: uuid("proposed_category_id").references(
    () => categories.id,
  ),
  confidence: numeric("confidence", { precision: 4, scale: 3 }).notNull(),
  reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
  confirmedTransactionId: uuid("confirmed_transaction_id").references(
    () => transactions.id,
  ),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

// Relations

export const profilesRelations = relations(profiles, ({ many }) => ({
  categories: many(categories),
  transactions: many(transactions),
  uploadedFiles: many(uploadedFiles),
  aiExtractions: many(aiExtractions),
  aiExtractedTransactions: many(aiExtractedTransactions),
}))

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(profiles, {
    fields: [categories.userId],
    references: [profiles.id],
  }),
  transactions: many(transactions),
  aiExtractedTransactions: many(aiExtractedTransactions),
}))

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(profiles, {
    fields: [transactions.userId],
    references: [profiles.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
  aiExtractedTransaction: one(aiExtractedTransactions, {
    fields: [transactions.aiExtractionId],
    references: [aiExtractedTransactions.id],
  }),
}))

export const uploadedFilesRelations = relations(
  uploadedFiles,
  ({ one, many }) => ({
    user: one(profiles, {
      fields: [uploadedFiles.userId],
      references: [profiles.id],
    }),
    aiExtractions: many(aiExtractions),
  }),
)

export const aiExtractionsRelations = relations(
  aiExtractions,
  ({ one, many }) => ({
    user: one(profiles, {
      fields: [aiExtractions.userId],
      references: [profiles.id],
    }),
    uploadedFile: one(uploadedFiles, {
      fields: [aiExtractions.uploadedFileId],
      references: [uploadedFiles.id],
    }),
    extractedTransactions: many(aiExtractedTransactions),
  }),
)

export const aiExtractedTransactionsRelations = relations(
  aiExtractedTransactions,
  ({ one }) => ({
    aiExtraction: one(aiExtractions, {
      fields: [aiExtractedTransactions.aiExtractionId],
      references: [aiExtractions.id],
    }),
    user: one(profiles, {
      fields: [aiExtractedTransactions.userId],
      references: [profiles.id],
    }),
    proposedCategory: one(categories, {
      fields: [aiExtractedTransactions.proposedCategoryId],
      references: [categories.id],
    }),
    confirmedTransaction: one(transactions, {
      fields: [aiExtractedTransactions.confirmedTransactionId],
      references: [transactions.id],
    }),
  }),
)
