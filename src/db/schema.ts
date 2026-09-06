import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─── users ───────────────────────────────────────────────────────────────────
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  name: text("name").notNull().default(""),
  plan: text("plan", { enum: ["free", "pro", "business"] }).notNull().default("free"),
  emailVerifiedAt: text("email_verified_at"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── qr_codes ────────────────────────────────────────────────────────────────
export const qrCodes = sqliteTable("qr_codes", {
  id: text("id").primaryKey(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id),
  // 128+ bits of cryptographic randomness, never sequential, never predictable
  publicToken: text("public_token").notNull().unique(),
  name: text("name").notNull().default(""),
  contentType: text("content_type", {
    enum: ["text", "url", "pdf", "image", "zip", "multi"],
  }).notNull(),
  status: text("status", {
    enum: ["active", "disabled", "deleted", "expired"],
  })
    .notNull()
    .default("active"),
  // Points to the current content_versions row — this is what makes dynamic replacement work (§21)
  currentContentVersionId: text("current_content_version_id"),
  expiresAt: text("expires_at"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── content_versions ────────────────────────────────────────────────────────
// The join table between qr_codes and their content.
// Inserting a new row + updating qr_codes.current_content_version_id IS the
// entire content-replacement mechanism (Blueprint §21).
export const contentVersions = sqliteTable("content_versions", {
  id: text("id").primaryKey(),
  qrCodeId: text("qr_code_id")
    .notNull()
    .references(() => qrCodes.id),
  versionNumber: integer("version_number").notNull().default(1),
  isCurrent: integer("is_current", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── files ───────────────────────────────────────────────────────────────────
export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  contentVersionId: text("content_version_id")
    .notNull()
    .references(() => contentVersions.id),
  // System-generated storage key — NEVER derived from user input (Blueprint §15)
  storageKey: text("storage_key").notNull(),
  // Original filename stored for display only, never used to build paths
  originalFilename: text("original_filename").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  checksum: text("checksum").notNull(),
  zipManifestJson: text("zip_manifest_json"), // JSON manifest for ZIP central directory
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── text_content ─────────────────────────────────────────────────────────────
export const textContent = sqliteTable("text_content", {
  id: text("id").primaryKey(),
  contentVersionId: text("content_version_id")
    .notNull()
    .references(() => contentVersions.id),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── url_content ──────────────────────────────────────────────────────────────
export const urlContent = sqliteTable("url_content", {
  id: text("id").primaryKey(),
  contentVersionId: text("content_version_id")
    .notNull()
    .references(() => contentVersions.id),
  targetUrl: text("target_url").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── access_rules ─────────────────────────────────────────────────────────────
// Argon2id / scrypt hash for viewer passwords. Never store plaintext (Blueprint §23).
export const accessRules = sqliteTable("access_rules", {
  id: text("id").primaryKey(),
  qrCodeId: text("qr_code_id")
    .notNull()
    .unique()
    .references(() => qrCodes.id),
  visibility: text("visibility", { enum: ["public", "password"] })
    .notNull()
    .default("public"),
  passwordHash: text("password_hash"), // scrypt hash only — never plaintext
  allowDownload: integer("allow_download", { mode: "boolean" }).notNull().default(true),
  viewOnly: integer("view_only", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── qr_scans ────────────────────────────────────────────────────────────────
// Privacy-by-design: Raw IP is NEVER stored. Country derived and IP discarded.
// Session hash is salted + rotated daily, not reversible to an identity (Blueprint §16, §26).
export const qrScans = sqliteTable("qr_scans", {
  id: text("id").primaryKey(),
  qrCodeId: text("qr_code_id")
    .notNull()
    .references(() => qrCodes.id),
  scannedAt: text("scanned_at").notNull().default(sql`(datetime('now'))`),
  country: text("country"),
  deviceType: text("device_type", { enum: ["mobile", "tablet", "desktop", "unknown"] }),
  browserFamily: text("browser_family"),
  // Rotating daily salted hash — cannot be reversed to identity (§16)
  sessionHash: text("session_hash"),
});

// ─── password_attempts ────────────────────────────────────────────────────────
export const passwordAttempts = sqliteTable("password_attempts", {
  id: text("id").primaryKey(),
  qrCodeId: text("qr_code_id")
    .notNull()
    .references(() => qrCodes.id),
  ipHash: text("ip_hash").notNull(), // Privacy-safe hash of IP, not raw IP
  attemptedAt: text("attempted_at").notNull().default(sql`(datetime('now'))`),
  success: integer("success", { mode: "boolean" }).notNull().default(false),
});

// ─── subscriptions ───────────────────────────────────────────────────────────
export const subscriptions = sqliteTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  plan: text("plan", { enum: ["free", "pro", "business"] }).notNull(),
  providerCustomerId: text("provider_customer_id"),
  status: text("status").notNull().default("active"),
  currentPeriodEnd: text("current_period_end"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── abuse_reports ───────────────────────────────────────────────────────────
// Public viewers can flag content. Reporter IP is hashed, never stored raw (§16).
export const abuseReports = sqliteTable("abuse_reports", {
  id: text("id").primaryKey(),
  qrCodeId: text("qr_code_id")
    .notNull()
    .references(() => qrCodes.id),
  reason: text("reason", {
    enum: ["illegal", "malware", "phishing", "copyright", "spam", "other"],
  }).notNull(),
  details: text("details"),
  reporterIpHash: text("reporter_ip_hash"),
  status: text("status", { enum: ["open", "reviewed", "actioned", "dismissed"] })
    .notNull()
    .default("open"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── audit_log ───────────────────────────────────────────────────────────────
export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  actorUserId: text("actor_user_id"),
  action: text("action").notNull(),
  targetType: text("target_type"),
  targetId: text("target_id"),
  metadata: text("metadata"), // JSON string
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Type exports ─────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type QrCode = typeof qrCodes.$inferSelect;
export type InsertQrCode = typeof qrCodes.$inferInsert;
export type ContentVersion = typeof contentVersions.$inferSelect;
export type InsertContentVersion = typeof contentVersions.$inferInsert;
export type FileRecord = typeof files.$inferSelect;
export type InsertFileRecord = typeof files.$inferInsert;
export type TextContent = typeof textContent.$inferSelect;
export type UrlContent = typeof urlContent.$inferSelect;
export type AccessRules = typeof accessRules.$inferSelect;
export type QrScan = typeof qrScans.$inferSelect;
export type PasswordAttempt = typeof passwordAttempts.$inferSelect;
export type AbuseReport = typeof abuseReports.$inferSelect;
export type InsertAbuseReport = typeof abuseReports.$inferInsert;
export type AuditLog = typeof auditLog.$inferSelect;
