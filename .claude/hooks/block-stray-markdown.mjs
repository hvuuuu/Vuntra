// PreToolUse hook (Write): refuse new Markdown files in the repo, except ADRs in docs/decisions/.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = input.tool_input?.file_path;
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
if (!file || !file.toLowerCase().endsWith(".md")) process.exit(0);

const abs = path.resolve(root, file);
const rel = path.relative(root, abs).split(path.sep).join("/");
if (rel.startsWith("..") || path.isAbsolute(rel)) process.exit(0); // outside the repo, e.g. memory files
if (existsSync(abs) || rel.startsWith("docs/decisions/")) process.exit(0);

console.log(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: `New Markdown files are not created in this repo (${rel}). Put the information in your reply, an existing doc, or an ADR in docs/decisions/.`,
    },
  }),
);
