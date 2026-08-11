import { Pool } from "pg";
import { config } from "dotenv";

config();

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    const connectionString = process.env.DATA_BASE;

    if (!connectionString) {
      throw new Error("Database URL is not found");
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
