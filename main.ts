// Seventeen Syllables of Debugging — entry program.
//
// Writes one haiku about debugging (5-7-5, 17 syllables, under 200
// characters) to /output/entry.txt. The haiku is a small true story:
// a debug print statement left in the code ships to production, and
// the people it was never meant for read it before its author does.
//
// Before writing, the program checks its own work against the gate:
// three lines, 5-7-5 syllables by vowel-group count, 1-200 characters.
// If the haiku ever failed its own shape, it would refuse to write
// an invalid entry rather than submit one the gate rejects.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const haiku = [
  "A print left behind",
  "spills my secrets to the logs.",
  "Users read them first.",
].join("\n");

const EXPECTED = [5, 7, 5];

function syllables(word: string): number {
  const letters = word.toLowerCase().replace(/[^a-z]/g, "");
  if (letters.length === 0) return 0;
  const groups = letters.match(/[aeiouy]+/g) ?? [];
  let count = groups.length;
  if (letters.endsWith("e") && count > 1) count -= 1;
  return Math.max(count, 1);
}

const lines = haiku.split("\n");
if (lines.length !== 3) throw new Error("haiku must have exactly 3 lines");
lines.forEach((line, i) => {
  const count = line.split(/\s+/).reduce((n, w) => n + syllables(w), 0);
  if (count !== EXPECTED[i]) {
    throw new Error(`line ${i + 1} has ${count} syllables, expected ${EXPECTED[i]}`);
  }
});
if (haiku.length < 1 || haiku.length > 200) {
  throw new Error(`haiku is ${haiku.length} characters, gate needs 1-200`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku + "\n", "utf8");
chmodSync("/output/entry.txt", 0o644);
