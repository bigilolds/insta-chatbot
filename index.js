import Insta from "@ber4tbey/insta.js";
import system from "./config/system.js";
import { containsAbuse, addWarning } from "./features/abuse.js";
import { pickWelcome } from "./features/welcome.js";
import { generateReply } from "./features/replies.js";
import { simulateTypingAndDelay } from "./features/typing.js";
import { handleCommand } from "./features/commands.js";

const client = new Insta.Client();

client.on("connected", () => {
  console.log(`${system.BOT_NAME} is online and ruling the chat 👑`);
});

client.on("messageCreate", async (message) => {
  try {
    if (message.author.id === client.user.id) return;
    try { message.markSeen(); } catch {}

    if (await handleCommand(message)) return;

    if (message.type === "user_joined"){
      const n = message.author.username;
      return message.chat.sendMessage(pickWelcome(n));
    }

    if (containsAbuse(message.content)){
      const w = await addWarning(String(message.author.id));
      if (w >= system.WARN_LIMIT){
        return message.chat.sendMessage(
          `Enough darling 😌 You've reached ${w} warnings.`
        );
      }
      return message.chat.sendMessage(
        `Mind your language babe 😘 (warning ${w}/3)`
      );
    }

    await simulateTypingAndDelay();

    const txt = (message.content || "").toLowerCase().trim();
    if (txt === "hi" || txt === "hello"){
      return message.chat.sendMessage(`Hey love 💗 I'm ${system.BOT_NAME}`);
    }

    const reply = await generateReply(message.content);
    await message.chat.sendMessage(reply);

  } catch (err){
    console.error("Error:", err);
  }
});

client.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
