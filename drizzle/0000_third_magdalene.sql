CREATE TYPE "public"."category_scope" AS ENUM('expense', 'income', 'both');--> statement-breakpoint
CREATE TYPE "public"."extraction_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('confirmed', 'draft', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TYPE "public"."upload_status" AS ENUM('pending', 'uploaded', 'processing', 'done', 'failed');--> statement-breakpoint
CREATE TABLE "ai_extracted_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ai_extraction_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"proposed_type" "transaction_type",
	"proposed_amount" numeric(18, 4),
	"proposed_currency" char(3),
	"proposed_date" date,
	"proposed_merchant" text,
	"proposed_note" text,
	"proposed_category_id" uuid,
	"confidence" numeric(4, 3) NOT NULL,
	"review_status" "review_status" DEFAULT 'pending' NOT NULL,
	"confirmed_transaction_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_extractions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"uploaded_file_id" uuid NOT NULL,
	"status" "extraction_status" DEFAULT 'pending' NOT NULL,
	"raw_result" jsonb,
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"scope" "category_scope" NOT NULL,
	"color" char(7),
	"icon" text,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"display_name" text,
	"default_currency" char(3),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid,
	"type" "transaction_type" NOT NULL,
	"status" "transaction_status" DEFAULT 'draft' NOT NULL,
	"amount" numeric(18, 4) NOT NULL,
	"currency" char(3) NOT NULL,
	"date" date NOT NULL,
	"merchant" text,
	"note" text,
	"ai_extraction_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "uploaded_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"original_filename" text NOT NULL,
	"mime_type" text NOT NULL,
	"storage_path" text NOT NULL,
	"file_size_bytes" bigint,
	"upload_status" "upload_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_extracted_transactions" ADD CONSTRAINT "ai_extracted_transactions_ai_extraction_id_ai_extractions_id_fk" FOREIGN KEY ("ai_extraction_id") REFERENCES "public"."ai_extractions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_extracted_transactions" ADD CONSTRAINT "ai_extracted_transactions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_extracted_transactions" ADD CONSTRAINT "ai_extracted_transactions_proposed_category_id_categories_id_fk" FOREIGN KEY ("proposed_category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_extracted_transactions" ADD CONSTRAINT "ai_extracted_transactions_confirmed_transaction_id_transactions_id_fk" FOREIGN KEY ("confirmed_transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_extractions" ADD CONSTRAINT "ai_extractions_uploaded_file_id_uploaded_files_id_fk" FOREIGN KEY ("uploaded_file_id") REFERENCES "public"."uploaded_files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uploaded_files" ADD CONSTRAINT "uploaded_files_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;