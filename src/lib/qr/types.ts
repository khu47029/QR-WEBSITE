export type ContentType = "text" | "url" | "pdf" | "image" | "zip" | "multi";

export type QrStatus = "active" | "disabled" | "deleted" | "expired";

export interface CreateQrInput {
  ownerId: string;
  name: string;
  contentType: ContentType;
  expiresAt?: Date | null;
  visibility: "public" | "password";
  viewerPassword?: string;
  allowDownload: boolean;
  viewOnly: boolean;
}

export interface QrWithRules {
  qrCode: import("@/db/schema").QrCode;
  accessRules: import("@/db/schema").AccessRules | null;
}

export interface FullQrData {
  qrCode: import("@/db/schema").QrCode;
  accessRules: import("@/db/schema").AccessRules | null;
  currentVersion: import("@/db/schema").ContentVersion | null;
  files: import("@/db/schema").FileRecord[];
  textBody: string | null;
  targetUrl: string | null;
}