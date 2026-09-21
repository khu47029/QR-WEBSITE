import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  generateId,
  hashPassword,
  verifyPassword,
} from "@/lib/security/crypto";
import type { User } from "@/db/schema";
export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const id = generateId();
  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    id,
    email: email.toLowerCase().trim(),
    passwordHash,
    name,
    plan: "free",
  });

  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()));

  return user ?? null;
}

export async function verifyUserPassword(
  email: string,
  password: string
): Promise<User | null> {
  const user = await getUserByEmail(email);

  if (!user || !user.passwordHash) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  return valid ? user : null;
}