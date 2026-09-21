import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { generateId } from "@/lib/security/crypto";

export async function logAudit(
  actorUserId: string | null,
  action: string,
  targetType: string,
  targetId: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  await db.insert(auditLog).values({
    id: generateId(),
    actorUserId,
    action,
    targetType,
    targetId,
    metadata: metadata ? JSON.stringify(metadata) : null,
  });
}