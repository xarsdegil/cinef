import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const run = (command) =>
  spawnSync(command, {
    shell: true,
    stdio: "inherit",
  });

const primary = run("prisma db push");

if (primary.status === 0) {
  process.exit(0);
}

const dbExists = existsSync("prisma/dev.db");

if (dbExists) {
  console.error(
    "Prisma db push failed and an existing SQLite file was detected. Delete prisma/dev.db to re-bootstrap from schema SQL.",
  );
  process.exit(primary.status ?? 1);
}

const fallback = run(
  "prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script | prisma db execute --stdin --schema prisma/schema.prisma",
);

process.exit(fallback.status ?? 1);
