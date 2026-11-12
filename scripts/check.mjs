import { access, readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const robots = await readFile(new URL("../robots.txt", import.meta.url), "utf8");

const requiredCopy = [
  "MitoSpectra",
  "Website under construction",
  "MitoSpectra is a non-invasive optical sensing technology, designed to monitor mitochondrial function and metabolic health in real time. Its applications span organ transplantation, critical care, human health and wellness, and plant monitoring, providing actionable insights into cellular metabolism, physiological stress and biological resilience across sectors.",
  "Research and development stage. Operated by a registered New Zealand sole trader · NZBN 9429054031869 · Trade mark protected.",
  "shining light on what matters",
  "Dr. Jules Devaux",
  "© 2026 MitoSpectra. All rights reserved.",
  "Aotearoa New Zealand",
  "Private draft"
];

const normalizedHtml = html.replace(/\s+/g, " ");
const failures = [];

try {
  await access(new URL("../assets/mitospectra-tm-colour.png", import.meta.url));
} catch {
  failures.push("Missing trademarked MitoSpectra mark asset");
}

if (!html.includes('src="assets/mitospectra-tm-colour.png"')) {
  failures.push("Page does not reference the trademarked MitoSpectra mark");
}

if (!html.includes('href="https://profiles.auckland.ac.nz/jules-devaux"')) {
  failures.push("Missing Dr. Jules Devaux UoA profile link");
}

for (const text of requiredCopy) {
  if (!normalizedHtml.includes(text)) failures.push(`Missing approved copy: ${text}`);
}

const prohibitedPatterns = [
  [/<form\b/i, "form element"],
  [/<script\b/i, "script element"],
  [/®/, "registered mark symbol"],
  [/Business registration and trade mark application are in progress/i, "stale registration wording"],
  [/Shared platform methods are being developed across optics/i, "removed shared platform copy"],
  [/shinning light on what matters/i, "misspelled tagline"],
  [/clinically approved/i, "clinical approval claim"],
  [/diagnos(?:e|is|tic)/i, "diagnostic claim"],
  [/available (?:now|today|for sale)/i, "product availability claim"],
  [/improves? performance/i, "performance claim"]
];

for (const [pattern, label] of prohibitedPatterns) {
  if (pattern.test(html)) failures.push(`Found prohibited ${label}`);
}

if (!html.includes('name="robots" content="noindex, nofollow, noarchive"')) {
  failures.push("Missing noindex metadata");
}

if (!robots.includes("Disallow: /")) failures.push("robots.txt does not block crawling");
if (!css.includes("prefers-reduced-motion")) failures.push("Missing reduced motion support");

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Holding page checks passed.");
