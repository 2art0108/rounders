// Production build for the Rounders pay-by-bank checkout.
// No bundler: the page is plain HTML/CSS/JS. This stages it into dist/ and
// bakes the deployment settings (Vercel env vars) into <html data-*> attributes.
//
//   ROUNDERS_API_BASE    payment backend base URL → real sessions (disables the mock)
//   ROUNDERS_RETURN_URL  where "Done" sends the customer after a successful payment
//   ROUNDERS_DEMO=1      also show the dev panel (raw mock controls) on a non-local host
const fs = require("fs");
const path = require("path");

const src = __dirname;
const dist = path.join(src, "dist");

const env = {
  apiBase: (process.env.ROUNDERS_API_BASE || "").trim(),
  returnUrl: (process.env.ROUNDERS_RETURN_URL || "").trim(),
  demo: /^(1|true|yes)$/i.test((process.env.ROUNDERS_DEMO || "").trim()),
};

for (const [name, value] of [["ROUNDERS_API_BASE", env.apiBase], ["ROUNDERS_RETURN_URL", env.returnUrl]]) {
  if (value && !/^https:\/\//.test(value)) throw new Error(`Build failed: ${name} must be an https:// URL.`);
}
if (env.apiBase && env.demo) {
  console.warn("Note: ROUNDERS_API_BASE is set, so the real backend is used and ROUNDERS_DEMO is ignored.");
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(path.join(src, "assets"), path.join(dist, "assets"), { recursive: true });

const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const attrs = [
  env.apiBase && `data-api-base="${esc(env.apiBase.replace(/\/+$/, ""))}"`,
  env.returnUrl && `data-return-url="${esc(env.returnUrl)}"`,
  env.demo && !env.apiBase && `data-demo="true"`,
].filter(Boolean);

let html = fs.readFileSync(path.join(src, "index.html"), "utf8");
if (!html.includes('<html lang="en">')) throw new Error('Build failed: <html lang="en"> tag not found.');
html = html.replace('<html lang="en">', `<html lang="en"${attrs.map((a) => " " + a).join("")}>`);
fs.writeFileSync(path.join(dist, "index.html"), html);

// Every local asset the page references must exist in dist/
const refs = [...html.matchAll(/src="(assets\/[^"]+)"/g)].map((m) => m[1]);
const missing = refs.filter((r) => !fs.existsSync(path.join(dist, r)));
if (!refs.length || missing.length) throw new Error("Build failed: missing assets: " + (missing.join(", ") || "none referenced"));

const mode = env.apiBase ? "live backend" : env.demo ? "demo + dev panel" : "demo (click-through, no backend)";
console.log(`Build complete → dist/  ·  ${refs.length} assets  ·  mode: ${mode}`);
