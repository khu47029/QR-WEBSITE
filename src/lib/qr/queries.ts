
import { db } from "@/db";
import {
  qrCodes,
  contentVersions,
  files,
  textContent,
  urlContent,
  accessRules,
} from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

import {
  generateId,
  generatePublicToken,
  hashPassword,
} from "@/lib/security/crypto";

import type {
  QrCode,
  AccessRules,
  ContentVersion,
  FileRecord,
} from "@/db/schema";

import type {
  CreateQrInput,
  FullQrData,
} from "@/lib/qr/types";

import { logAudit } from "@/lib/audit-queries";


// ─── Create QR ────────────────────────────────────────────────────────────────

export async function createQrCode(
  input: CreateQrInput
): Promise<QrCode> {
  const qrId = generateId();
  const versionId = generateId();
  const publicToken = generatePublicToken();
  const rulesId = generateId();

  await db.insert(qrCodes).values({
    id: qrId,
    ownerId: input.ownerId,
    publicToken,
    name: input.name,
    contentType: input.contentType,
    status: "active",
    currentContentVersionId: versionId,
    expiresAt: input.expiresAt?.toISOString() ?? null,
  });

  await db.insert(contentVersions).values({
    id: versionId,
    qrCodeId: qrId,
    versionNumber: 1,
    isCurrent: true,
  });

  const passwordHash = input.viewerPassword
    ? await hashPassword(input.viewerPassword)
    : null;

  await db.insert(accessRules).values({
    id: rulesId,
    qrCodeId: qrId,
    visibility: input.visibility,
    passwordHash,
    allowDownload: input.allowDownload,
    viewOnly: input.viewOnly,
  });

  await logAudit(
    input.ownerId,
    "qr_code.create",
    "qr_code",
    qrId
  );

  const [created] = await db
    .select()
    .from(qrCodes)
    .where(eq(qrCodes.id, qrId));

  return created;
}


// ─── Get QR by public token ──────────────────────────────────────────────────

export async function getQrByToken(
  token: string
): Promise<FullQrData | null> {
  const [qrCode] = await db
    .select()
    .from(qrCodes)
    .where(eq(qrCodes.publicToken, token));

  if (!qrCode) return null;

  // Request-time expiry check
  if (
    qrCode.expiresAt &&
    new Date(qrCode.expiresAt) <= new Date()
  ) {
    if (qrCode.status === "active") {
      await db
        .update(qrCodes)
        .set({
          status: "expired",
          updatedAt: new Date().toISOString(),
        })
        .where(eq(qrCodes.id, qrCode.id));
    }

    return {
      qrCode: {
        ...qrCode,
        status: "expired",
      },
      accessRules: null,
      currentVersion: null,
      files: [],
      textBody: null,
      targetUrl: null,
    };
  }

  const [rules] = await db
    .select()
    .from(accessRules)
    .where(eq(accessRules.qrCodeId, qrCode.id));

  if (!qrCode.currentContentVersionId) {
    return {
      qrCode,
      accessRules: rules ?? null,
      currentVersion: null,
      files: [],
      textBody: null,
      targetUrl: null,
    };
  }

  const [currentVersion] = await db
    .select()
    .from(contentVersions)
    .where(
      eq(
        contentVersions.id,
        qrCode.currentContentVersionId
      )
    );

  const fileList = await db
    .select()
    .from(files)
    .where(
      eq(
        files.contentVersionId,
        qrCode.currentContentVersionId
      )
    );

  const [text] = await db
    .select()
    .from(textContent)
    .where(
      eq(
        textContent.contentVersionId,
        qrCode.currentContentVersionId
      )
    );

  const [url] = await db
    .select()
    .from(urlContent)
    .where(
      eq(
        urlContent.contentVersionId,
        qrCode.currentContentVersionId
      )
    );

  return {
    qrCode,
    accessRules: rules ?? null,
    currentVersion: currentVersion ?? null,
    files: fileList,
    textBody: text?.body ?? null,
    targetUrl: url?.targetUrl ?? null,
  };
}


// ─── Get all QR codes for owner ──────────────────────────────────────────────

export async function getQrCodesByOwner(
  ownerId: string
): Promise<QrCode[]> {
  return db
    .select()
    .from(qrCodes)
    .where(
      and(
        eq(qrCodes.ownerId, ownerId),
        eq(qrCodes.status, "active")
      )
    )
    .orderBy(desc(qrCodes.createdAt));
}


// ─── Get QR code for owner ───────────────────────────────────────────────────

export async function getQrCodeForOwner(
  qrId: string,
  ownerId: string
): Promise<QrCode | null> {
  const [qr] = await db
    .select()
    .from(qrCodes)
    .where(
      and(
        eq(qrCodes.id, qrId),
        eq(qrCodes.ownerId, ownerId)
      )
    );

  return qr ?? null;
}


// ─── Get complete QR data for owner ──────────────────────────────────────────

export async function getFullQrDataForOwner(
  qrId: string,
  ownerId: string
): Promise<FullQrData | null> {
  const qrCode = await getQrCodeForOwner(
    qrId,
    ownerId
  );

  if (!qrCode) return null;

  const [rules] = await db
    .select()
    .from(accessRules)
    .where(eq(accessRules.qrCodeId, qrCode.id));

  if (!qrCode.currentContentVersionId) {
    return {
      qrCode,
      accessRules: rules ?? null,
      currentVersion: null,
      files: [],
      textBody: null,
      targetUrl: null,
    };
  }

  const versionId = qrCode.currentContentVersionId;

  const [
    [currentVersion],
    fileList,
    [text],
    [url],
  ] = await Promise.all([
    db
      .select()
      .from(contentVersions)
      .where(eq(contentVersions.id, versionId)),

    db
      .select()
      .from(files)
      .where(eq(files.contentVersionId, versionId)),

    db
      .select()
      .from(textContent)
      .where(eq(textContent.contentVersionId, versionId)),

    db
      .select()
      .from(urlContent)
      .where(eq(urlContent.contentVersionId, versionId)),
  ]);

  return {
    qrCode,
    accessRules: rules ?? null,
    currentVersion: currentVersion ?? null,
    files: fileList,
    textBody: text?.body ?? null,
    targetUrl: url?.targetUrl ?? null,
  };
}


// ─── Set viewer password ─────────────────────────────────────────────────────

export async function setViewerPassword(
  qrId: string,
  ownerId: string,
  password: string | null
): Promise<void> {
  const existing = await getQrCodeForOwner(
    qrId,
    ownerId
  );

  if (!existing) {
    throw new Error(
      "QR code not found or not owned by user"
    );
  }

  await db
    .update(accessRules)
    .set({
      visibility: password ? "password" : "public",
      passwordHash: password
        ? await hashPassword(password)
        : null,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(accessRules.qrCodeId, qrId));

  await logAudit(
    ownerId,
    password
      ? "qr_code.password_set"
      : "qr_code.password_cleared",
    "qr_code",
    qrId
  );
}


// ─── Replace QR content ──────────────────────────────────────────────────────

export async function replaceQrContent(
  qrId: string,
  ownerId: string
): Promise<ContentVersion> {
  const existing = await getQrCodeForOwner(
    qrId,
    ownerId
  );

  if (!existing) {
    throw new Error(
      "QR code not found or not owned by user"
    );
  }

  if (existing.currentContentVersionId) {
    await db
      .update(contentVersions)
      .set({
        isCurrent: false,
      })
      .where(
        eq(
          contentVersions.id,
          existing.currentContentVersionId
        )
      );
  }

  const existingVersions = await db
    .select()
    .from(contentVersions)
    .where(
      eq(contentVersions.qrCodeId, qrId)
    );

  const newVersionId = generateId();
  const newVersionNumber =
    existingVersions.length + 1;

  await db.insert(contentVersions).values({
    id: newVersionId,
    qrCodeId: qrId,
    versionNumber: newVersionNumber,
    isCurrent: true,
  });

  await db
    .update(qrCodes)
    .set({
      currentContentVersionId: newVersionId,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(qrCodes.id, qrId));

  await logAudit(
    ownerId,
    "qr_code.content_replaced",
    "qr_code",
    qrId,
    {
      newVersionId,
      versionNumber: newVersionNumber,
    }
  );

  const [newVersion] = await db
    .select()
    .from(contentVersions)
    .where(
      eq(contentVersions.id, newVersionId)
    );

  return newVersion;
}


// ─── Soft delete QR ──────────────────────────────────────────────────────────

export async function softDeleteQrCode(
  qrId: string,
  ownerId: string
): Promise<void> {
  const existing = await getQrCodeForOwner(
    qrId,
    ownerId
  );

  if (!existing) {
    throw new Error(
      "QR code not found or not owned by user"
    );
  }

  await db
    .update(qrCodes)
    .set({
      status: "deleted",
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(qrCodes.id, qrId),
        eq(qrCodes.ownerId, ownerId)
      )
    );

  await logAudit(
    ownerId,
    "qr_code.soft_delete",
    "qr_code",
    qrId
  );
}


// ─── Set QR status ───────────────────────────────────────────────────────────

export async function setQrStatus(
  qrId: string,
  ownerId: string,
  status: "active" | "disabled"
): Promise<void> {
  const existing = await getQrCodeForOwner(
    qrId,
    ownerId
  );

  if (!existing) {
    throw new Error(
      "QR code not found or not owned by user"
    );
  }

  await db
    .update(qrCodes)
    .set({
      status,
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(qrCodes.id, qrId),
        eq(qrCodes.ownerId, ownerId)
      )
    );

  await logAudit(
    ownerId,
    `qr_code.${status}`,
    "qr_code",
    qrId
  );
}