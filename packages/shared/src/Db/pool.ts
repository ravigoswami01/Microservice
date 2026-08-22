import { Pool } from "pg";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env") });

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL?.trim();

    if (!connectionString) {
      throw new Error("DATABASE_URL is not found in .env");
    }

    const hasSslParams =
      connectionString.includes("sslmode=") || connectionString.includes("uselibpqcompat=");

    let finalConnectionString = connectionString;

    if (!hasSslParams) {
      finalConnectionString += connectionString.includes("?")
        ? "&sslmode=verify-full"
        : "?sslmode=verify-full";
    } else {
      const aliasSslmode = /sslmode=(?:prefer|require|verify-ca)/i;
      if (aliasSslmode.test(connectionString) && !connectionString.includes("uselibpqcompat=")) {
        finalConnectionString += connectionString.includes("?")
          ? "&uselibpqcompat=true"
          : "?uselibpqcompat=true";
      }
    }

    pool = new Pool({ connectionString: finalConnectionString });
  }

  return pool;
};

export async function initPool(): Promise<void> {
  const p = getPool();
  try {
    await p.query("SELECT 1");
  } catch (err) {
    throw new Error(`Failed to connect to database: ${(err as Error).message}`);
  }
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
