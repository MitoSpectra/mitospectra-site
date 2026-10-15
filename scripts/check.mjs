import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const robots = await readFile(new URL("../robots.txt", import.meta.url), "utf8");

const requiredCopy = [
  "Research platform in development",
  "MitoSpectra",
  "Website under construction",
  "MitoSpectra is an early stage research platform exploring quality controlled optical measurement, signal processing and provenance rich data for mitochondrial spectroscopy research.",
  "Shared platform methods are being developed across optics, acquisition, calibration and data quality. Interpretation and validation remain specific to each research setting.",
  "Research and development stage. Business registration and trade mark application are in progress.",
  "Aotearoa New Zealand",
  "Private draft"
];

const normalizedHtml = html.replace(/\s+/g, " ");
const failures = [];

for (const text of requiredCopy) {
  if (!normalizedHtml.includes(text)) failures.push(`Missing approved copy: ${text}`);
}

const prohibitedPatterns = [
  [/<form\b/i, "form element"],
  [/<script\b/i, "script element"],
  [/®/, "registered mark symbol"],
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
