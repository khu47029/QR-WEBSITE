import { db } from "@/db";
import { qrScans } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { generateId } from "@/lib/security/crypto";

export async function recordScan(
  qrCodeId: string,
  opts: {
    country?: string;
    deviceType?: "mobile" | "tablet" | "desktop" | "unknown";
    browserFamily?: string;
    sessionHash?: string;
  }
): Promise<void> {
  await db.insert(qrScans).values({
    id: generateId(),
    qrCodeId,
    country: opts.country,
    deviceType: opts.deviceType ?? "unknown",
    browserFamily: opts.browserFamily,
    sessionHash: opts.sessionHash,
  });
}

export async function getScanCount(
  qrCodeId: string
): Promise<number> {
  const [row] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(qrScans)
    .where(eq(qrScans.qrCodeId, qrCodeId));

  return Number(row?.count ?? 0);
}

/**
 * Batched scan counts for a list of QR codes.
 * Avoids an N+1 query on the dashboard.
 */
export async function getScanCountsByQrIds(
  qrCodeIds: string[]
): Promise<Record<string, number>> {
  if (qrCodeIds.length === 0) return {};

  const rows = await db
    .select({
      qrCodeId: qrScans.qrCodeId,
      count: sql<number>`count(*)`,
    })
    .from(qrScans)
    .where(inArray(qrScans.qrCodeId, qrCodeIds))
    .groupBy(qrScans.qrCodeId);

  const counts: Record<string, number> = {};

  for (const row of rows) {
    counts[row.qrCodeId] = Number(row.count);
  }

  return counts;
}