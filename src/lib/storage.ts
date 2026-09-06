import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { sanitizeFilename } from "./utils";

export interface StorageObjectMetadata {
  storageKey: string;
  sizeBytes: number;
  mimeType: string;
  checksum: string;
}

export interface PresignedUploadUrlResponse {
  uploadUrl: string;
  storageKey: string;
  expiresInSeconds: number;
  headers?: Record<string, string>;
}

// Local storage base directory for dev
const LOCAL_STORAGE_DIR = path.join(process.cwd(), ".local_storage");

/**
 * Guards against deploying into a half-implemented object-storage backend.
 *
 * Only the local filesystem driver is implemented: putObject/getObject/deleteObject
 * all read and write under LOCAL_STORAGE_DIR. The R2 branch that used to live in
 * getPresignedUploadUrl() returned a bare bucket URL with no SigV4 signature, and
 * nothing ever read bytes back out of R2 — so setting the R2 variables produced a
 * deployment where uploads were rejected by the bucket and every download served
 * nothing, silently. Failing here is the honest behaviour until a signed R2 driver
 * exists.
 */
function assertStorageConfigured(): void {
  const r2Vars = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
  ].filter((name) => process.env[name]);

  if (r2Vars.length > 0) {
    throw new Error(
      `Object storage is configured (${r2Vars.join(", ")}) but the R2 driver is not ` +
        `implemented — uploads would not be signed and downloads would return nothing. ` +
        `Unset these variables to use the local filesystem driver, or implement a signed ` +
        `R2 driver in src/lib/storage.ts before deploying.`
    );
  }
}

/**
 * Resolves a storage key to an absolute path, refusing anything that escapes
 * the storage root.
 *
 * Callers pass keys that originate from request bodies, so `path.join` alone is
 * not safe: a key like "<uuid>/../../../../etc/passwd" would resolve outside the
 * bucket and turn getObject() into arbitrary file read. Containment is checked
 * after normalization, which is the only point where traversal is detectable.
 */
function resolveStoragePath(storageKey: string): string {
  if (!storageKey || storageKey.includes("\0")) {
    throw new Error("Invalid storage key");
  }

  const root = path.resolve(LOCAL_STORAGE_DIR);
  const resolved = path.resolve(root, storageKey);

  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error("Invalid storage key: path escapes storage root");
  }

  return resolved;
}

/**
 * Validates that a storage key has the exact shape buildStorageKey() produces.
 * Used at trust boundaries where the key arrives from a client.
 */
export function isValidStorageKey(storageKey: string): boolean {
  return /^[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f]{8}-[a-zA-Z0-9._-]{1,100}$/.test(
    storageKey
  );
}

/**
 * Builds the canonical storage key according to Blueprint §11:
 * {ownerId}/{qrCodeId}/{versionId}/{shortHash}-{sanitizedFilename}
 */
export function buildStorageKey(
  ownerId: string,
  qrCodeId: string,
  versionId: string,
  originalFilename: string
): string {
  const shortHash = crypto.randomBytes(4).toString("hex");
  const cleanName = sanitizeFilename(originalFilename);
  return `${ownerId}/${qrCodeId}/${versionId}/${shortHash}-${cleanName}`;
}

/**
 * Generates a presigned upload URL or local upload route for client direct-PUT.
 */
export async function getPresignedUploadUrl(
  storageKey: string,
  declaredMime: string,
  maxSizeBytes: number,
  expiresInSeconds = 300
): Promise<PresignedUploadUrlResponse> {
  assertStorageConfigured();

  // Local filesystem driver: the client PUTs to our own route, which enforces the
  // same key validation as /api/uploads/complete.
  const uploadUrl = `/api/uploads/direct?key=${encodeURIComponent(storageKey)}`;
  return {
    uploadUrl,
    storageKey,
    expiresInSeconds,
  };
}

/**
 * Stores file buffer securely in the storage backend.
 */
export async function putObject(
  storageKey: string,
  buffer: Buffer,
  mimeType: string
): Promise<StorageObjectMetadata> {
  const fullPath = resolveStoragePath(storageKey);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, buffer);

  const checksum = crypto.createHash("sha256").update(buffer).digest("hex");

  return {
    storageKey,
    sizeBytes: buffer.length,
    mimeType,
    checksum,
  };
}

/**
 * Retrieves file buffer securely from the storage backend.
 */
export async function getObject(storageKey: string): Promise<Buffer | null> {
  let fullPath: string;
  try {
    fullPath = resolveStoragePath(storageKey);
  } catch {
    // A malformed or traversing key is treated as "no such object" rather than
    // surfacing why it was rejected.
    return null;
  }

  try {
    return await fs.readFile(fullPath);
  } catch (err: any) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

/**
 * Deletes an object from storage.
 */
export async function deleteObject(storageKey: string): Promise<boolean> {
  try {
    await fs.unlink(resolveStoragePath(storageKey));
    return true;
  } catch {
    return false;
  }
}
