import { Pool } from "pg";
import { config } from "dotenv";
import { resolve } from "node:path";

const envPath = resolve(__dirname, "../../");
config({ path: envPath });

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    const connectionString = process.env.DATA_BASE?.trim();

    if (!connectionString) {
      throw new Error(`Database URL is not found. Checked .env path: ${envPath}`);
    }
    const hasSslParams =
      connectionString.includes("sslmode=") || connectionString.includes("uselibpqcompat=");

    let finalConnectionString = connectionString;

    if (!hasSslParams) {
      finalConnectionString =
        connectionString + (connectionString.includes("?") ? "&" : "?") + "sslmode=verify-full";
    } else {

      const aliasSslmode = /sslmode=(?:prefer|require|verify-ca)/i;
      if (aliasSslmode.test(connectionString) && !connectionString.includes("uselibpqcompat=")) {
        finalConnectionString = connectionString + (connectionString.includes("?") ? "&" : "?") + "uselibpqcompat=true";
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
