import { addWarning, resetWarnings } from "./abuse.js";
const OWNER_USERNAME = "bigilolds";

function isOwner(username){
  return username?.toLowerCase() === OWNER_USERNAME.toLowerCase();
}

async function handleCommand(message){
  const text = message.content.trim();
  if (!text.startsWith("/")) return false;

  if (!isOwner(message.author.username)){
    await message.chat.sendMessage("Only my creator can use commands, darling 💅");
    return true;
  }

  const parts = text.split(/\s+/);
  const cmd = parts[0].toLowerCase();

  if (cmd === "/ping"){
    await message.chat.sendMessage("Isabella is alive 👑");
    return true;
  }

  if (cmd === "/warn"){
    const target = (message.mentions?.[0]?.id) || parts[1];
    if (!target) return message.chat.sendMessage("Usage: /warn @user");
    const w = await addWarning(String(target));
    await message.chat.sendMessage(`Warning issued — (${w}/3)`);
    return true;
  }

  if (cmd === "/resetwarnings"){
    const target = (message.mentions?.[0]?.id) || parts[1];
    if (!target) return message.chat.sendMessage("Usage: /resetwarnings @user");
    await resetWarnings(String(target));
    await message.chat.sendMessage("Warnings reset 💗");
    return true;
  }

  return true;
}

export { handleCommand };