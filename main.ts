// Seventeen Syllables of Debugging — entry program.
//
// Writes one haiku about debugging (5-7-5, 17 syllables, under 200
// characters) to /output/entry.txt. The haiku is a small true story:
// a debug print statement left in the code ships to production, and
// the people it was never meant for read it before its author does.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

const haiku = [
  "A print left behind",
  "spills my secrets to the logs.",
  "Users read them first.",
].join("\n");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku + "\n", "utf8");
chmodSync("/output/entry.txt", 0o644);
