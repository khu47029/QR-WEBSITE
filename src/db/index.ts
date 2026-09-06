import path from "path";
import fs from "fs/promises";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import type { AsyncRemoteCallback } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

/**
 * Database transport.
 *
 * Local development runs on Node's built-in `node:sqlite`, reached through
 * Drizzle's sqlite-proxy adapter. `@libsql/client` is deliberately NOT imported
 * at module scope: its prebuilt binding needs the Microsoft Visual C++ runtime,
 * and on a machine without it the import throws ERR_DLOPEN_FAILED while Next is
 * collecting page data — failing the build rather than just one request.
 * `node:sqlite` is compiled into the node binary, so it has no such dependency.
 *
 * Remote libsql/Turso URLs still work: that driver is imported lazily, inside
 * the async proxy callback, so it is only ever loaded when actually configured.
 *
 * Schema, queries, and migrations are unchanged by this — only the wire is.
 */

type Method = "run" | "all" | "values" | "get";
type Executor = (sql: string, params: unknown[], method: Method) => Promise<{ rows: any }>;

const RAW_URL =
  process.env.DATABASE_URL || `file:${path.join(process.cwd(), "qr_platform.db")}`;

const IS_REMOTE = /^(libsql|https?|wss?):/i.test(RAW_URL);

/** Converts a libsql-style `file:` URL into a plain filesystem path. */
function toFsPath(url: string): string {
  if (url === ":memory:" || url === "file::memory:") return ":memory:";
  if (!url.startsWith("file:")) return url; // already a bare path

  let p = url.slice("file:".length);
  // file://<authority>/path — we only support a local (empty/localhost) authority
  if (p.startsWith("//")) p = p.replace(/^\/\/[^/]*/, "");
  // Windows drive letters arrive as "/E:/dir" from file:///E:/dir
  if (/^\/[A-Za-z]:/.test(p)) p = p.slice(1);
  try {
    p = decodeURIComponent(p);
  } catch {
    // A stray '%' isn't an encoding error worth failing startup over.
  }
  return p;
}

/**
 * Coerces JS values into what SQLite bindings accept. Drizzle's column mappers
 * already handle the common cases; this is a defensive backstop so an unexpected
 * boolean/Date/undefined surfaces as correct data rather than a driver throw.
 */
function normalizeParam(value: unknown): unknown {
  if (value === undefined) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (value instanceof Date) return value.toISOString();
  return value;
}

async function createLocalExecutor(): Promise<Executor> {
  const { DatabaseSync } = await import("node:sqlite");

  const file = toFsPath(RAW_URL);
  if (file !== ":memory:") {
    await fs.mkdir(path.dirname(path.resolve(file)), { recursive: true });
  }

  const sqlite = new DatabaseSync(file);
  // WAL lets reads proceed during writes; busy_timeout absorbs the brief lock
  // contention that concurrent route handlers would otherwise fail on.
  if (file !== ":memory:") sqlite.exec("PRAGMA journal_mode = WAL");
  sqlite.exec("PRAGMA foreign_keys = ON");
  sqlite.exec("PRAGMA busy_timeout = 5000");

  // Statement cache: Drizzle sends a small set of stable SQL strings, so
  // re-preparing each one per request is pure overhead.
  const cache = new Map<string, ReturnType<typeof sqlite.prepare>>();
  function prepare(sqlText: string) {
    let stmt = cache.get(sqlText);
    if (!stmt) {
      stmt = sqlite.prepare(sqlText);
      // sqlite-proxy expects rows as arrays of column values, not objects.
      stmt.setReturnArrays(true);
      cache.set(sqlText, stmt);
    }
    return stmt;
  }

  return async (sqlText, params, method) => {
    const args = params.map(normalizeParam) as never[];
    const stmt = prepare(sqlText);

    if (method === "run") {
      stmt.run(...args);
      return { rows: [] };
    }

    if (method === "get") {
      // Must be undefined (not []) when nothing matched — sqlite-proxy treats a
      // truthy value as a real row and would map an empty array into an object
      // of undefined fields instead of returning "not found".
      return { rows: stmt.get(...args) ?? undefined };
    }

    return { rows: stmt.all(...args) };
  };
}

async function createRemoteExecutor(): Promise<Executor> {
  const { createClient } = await import("@libsql/client");
  const client = createClient({
    url: RAW_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  return async (sqlText, params, method) => {
    const rs = await client.execute({
      sql: sqlText,
      args: params.map(normalizeParam) as never[],
    });

    if (method === "run") return { rows: [] };

    // libsql rows are array-like; project them by column index so the shape
    // matches what sqlite-proxy expects.
    const rows = rs.rows.map((row) =>
      rs.columns.map((_col, i) => (row as unknown as unknown[])[i])
    );

    if (method === "get") return { rows: rows[0] ?? undefined };
    return { rows };
  };
}

// One executor per process, created on first query. A failed init clears the
// cache so the next request retries instead of latching onto a rejected promise.
let executorPromise: Promise<Executor> | null = null;

function getExecutor(): Promise<Executor> {
  if (!executorPromise) {
    executorPromise = (IS_REMOTE ? createRemoteExecutor() : createLocalExecutor()).catch(
      (err) => {
        executorPromise = null;
        throw err;
      }
    );
  }
  return executorPromise;
}

const callback: AsyncRemoteCallback = async (sqlText, params, method) => {
  const execute = await getExecutor();
  return (await execute(sqlText, params, method)) as { rows: any[] };
};

export const db = drizzle(callback, { schema });
export type DB = typeof db;
