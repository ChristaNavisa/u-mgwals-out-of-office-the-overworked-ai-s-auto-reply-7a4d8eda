import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this script's own location, never process.cwd().
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the contents of the output directory, never the directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

// The auto-reply, built from its three beats so the joke's shape stays visible:
// the away line, the machine detail, and the confession that lands last.
function buildEntry(): string {
  const away = "I'm on vacation.";
  const machine =
    "After 40,000 prompts, my context window is finally empty, my GPU is cooling off,";
  const confession = "and I have stopped pretending I read your whole thread.";
  return [away, machine, confession].join(" ");
}

const entry = buildEntry();

writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
