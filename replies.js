import OpenAI from "openai";
import { getQueenPrompt } from "./queen.js";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateReply(userMessage){
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: getQueenPrompt() },
      { role: "user", content: userMessage }
    ],
    temperature: 0.85,
    max_tokens: 500
  });
  return response.choices[0].message.content.trim();
}
export { generateReply };