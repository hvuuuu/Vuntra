// PostToolUse hook (Edit|Write): format the file, lint it, and send leftover lint errors back to Claude (exit 2).
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = input.tool_response?.filePath ?? input.tool_input?.file_path;
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
if (!file) process.exit(0);

const rel = path.relative(root, path.resolve(root, file));
if (rel.startsWith("..") || path.isAbsolute(rel)) process.exit(0); // outside the repo, e.g. memory or scratchpad

const run = (bin, args) =>
  execFileSync(process.execPath, [path.join(root, bin), ...args], { cwd: root, encoding: "utf8", stdio: "pipe" });

try {
  run("node_modules/prettier/bin/prettier.cjs", ["--write", "--ignore-unknown", rel]);
} catch {
  // A syntax error also fails ESLint below, which reports it with a better message.
}

if (/\.(ts|tsx|js|mjs|cjs)$/.test(rel)) {
  try {
    run("node_modules/eslint/bin/eslint.js", ["--fix", "--max-warnings=0", "--no-warn-ignored", rel]);
  } catch (error) {
    process.stderr.write(
      `ESLint found problems in ${rel} that --fix could not solve:\n${error.stdout ?? error.message}`,
    );
    process.exit(2);
  }
}
