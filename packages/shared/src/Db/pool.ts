import { Pool } from "pg";
import { config } from "dotenv";
import { resolve } from "node:path";

const envPath = resolve(__dirname, "../../../../.env");
config({ path: envPath });

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    const connectionString = process.env.DATA_BASE?.trim();

    if (!connectionString) {
      throw new Error(`Database URL is not found. Checked .env path: ${envPath}`);
    }

    pool = new Pool({ connectionString });
  }

  return pool;
};

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
