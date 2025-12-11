import fs from "fs-extra";
import path from "path";
import system from "../config/system.js";
const DB_PATH = path.resolve("./database/users.json");

async function loadDB() {
  await fs.ensureFile(DB_PATH);
  const raw = await fs.readFile(DB_PATH, "utf8").catch(() => "{}");
  try { return JSON.parse(raw || "{}"); } catch { return {}; }
}
async function saveDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}
function containsAbuse(text) {
  if (!text) return false;
  const t = text.toLowerCase();
  return system.ABUSE_WORDS.some(w => t.includes(w));
}
async function addWarning(userId) {
  const db = await loadDB();
  if (!db[userId]) db[userId] = { warnings: 0 };
  db[userId].warnings += 1;
  await saveDB(db);
  return db[userId].warnings;
}
async function resetWarnings(userId) {
  const db = await loadDB();
  if (db[userId]) db[userId].warnings = 0;
  await saveDB(db);
}
export { containsAbuse, addWarning, resetWarnings, loadDB, saveDB };