const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();
const axios = require("axios");

// ---------- SESSION LOGIN ----------
async function loginWithSession() {
    ig.state.generateDevice(process.env.IG_USERNAME);

    await ig.state.deserialize({
        cookies: {
            'sessionid': process.env.IG_SESSIONID
        }
    });

    console.log("Isabella 🕊️ logged in using SESSION ID! 👑");
}

// ---------- AI RESPONSE ----------
async function getAIResponse(prompt) {
    const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        },
        {
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return result.data.choices[0].message.content;
}

// ---------- LISTEN FOR MESSAGES ----------
async function startBot() {
    await loginWithSession();

    const inbox = ig.feed.directInbox();
    console.log("Isabella is now watching chats… 👑");

    setInterval(async () => {
        const threads = await inbox.items();

        for (let thread of threads) {
            const lastMsg = thread.items[0];
            if (!lastMsg) continue;

            const text = lastMsg.text || "";
            const aiReply = await getAIResponse(text);

            await ig.entity.directThread(thread.thread_id).broadcastText(aiReply);
        }
    }, 3000);
}

startBot();
