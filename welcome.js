import system from "../config/system.js";
function pickWelcome(name){
  const t = system.WELCOME_TEMPLATES;
  return t[Math.floor(Math.random() * t.length)]
    .replace("{name}", name || "there");
}
export { pickWelcome };