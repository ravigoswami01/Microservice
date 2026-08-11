import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { closePool, getPool } from "../packages/shared/src/Db/pool";

config({ path: resolve(process.cwd(), ".env") });

async function main() {
  const file = process.argv[2] ?? "Sql/01_user.sql";
  const sql = readFileSync(resolve(process.cwd(), file), "utf-8");

  const pool = getPool();
  await pool.query(sql);
  console.log(`migreate : ${file}`);

  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
