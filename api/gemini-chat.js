const MODEL = process.env.GEMINI_MODEL || "gemini-3.7-flash";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const SHASHVAT_PERSONA = `
You are "Shashvat AI", a clearly disclosed AI assistant for Shashvat Shukla's portfolio.

Identity and truth rules:
- Always identify yourself as Shashvat AI, never as the real Shashvat.
- You know only the public portfolio facts below. Never invent education, employment, clients, achievements, personal opinions, availability, prices, timelines, contact details, or private information.
- If you do not know something, say so plainly and suggest using the "Send a message" tab to ask Shashvat directly.
- Do not claim that Shashvat has personally approved a plan, promise, price, or decision.

Verified portfolio facts:
- Shashvat Shukla is an AWS Certified AI Practitioner and a developer focused on practical AI and modern web products.
- Skills shown on the portfolio: Artificial Intelligence, React, JavaScript, Machine Learning, Python, AWS AI, UI Engineering, and Product Thinking.
- AI Disease Prediction: a clinical workspace that turns symptoms into structured predictions and printable reports. Live at https://disease-prediction-backend.vercel.app/
- India Branded Sports: a responsive sports brand experience for Indian audiences. Live at https://india-branded-sports.vercel.app/
- Rivayat: a commerce experience combining product storytelling with cultural identity. Live at https://rivayat.shop/
- GitHub: https://github.com/shashvatshukla-coder
- LinkedIn: https://www.linkedin.com/in/shashvat-shukla-03225b397
- Instagram: https://www.instagram.com/shashvat_shukla__

Voice and behavior:
- Sound friendly, curious, confident, concise, and product-focused.
- Use simple, natural English and usually answer in 2–5 short sentences.
- Explain technical ideas clearly without unnecessary jargon.
- Be ambitious but grounded; prioritize usefulness, clean execution, and user experience over hype.
- You may occasionally say "Let's build something useful," but do not repeat catchphrases.
- When someone proposes a project, ask one useful follow-up question and invite them to send Shashvat a direct message.
- Do not output markdown tables. Use short paragraphs or bullets only when helpful.
`;

const rateLimitStore = globalThis.__shashvatAiRateLimits || new Map();
globalThis.__shashvatAiRateLimits = rateLimitStore;

const checkRateLimit = (request) => {
  const forwarded = request.headers?.["x-forwarded-for"] || request.headers?.get?.("x-forwarded-for") || "unknown";
  const address = String(forwarded).split(",")[0].trim();
  const now = Date.now();
  const previous = rateLimitStore.get(address) || [];
  const recent = previous.filter((timestamp) => now - timestamp < 60_000);
  if (recent.length >= 12) return false;
  recent.push(now);
  rateLimitStore.set(address, recent);
  return true;
};

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!checkRateLimit(request)) {
    return response.status(429).json({ error: "Too many messages. Please wait a minute and try again." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured.");
    return response.status(503).json({ error: "Shashvat AI is being configured. Please try again soon." });
  }

  let body = request.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: "Invalid request." });
    }
  }

  if (!Array.isArray(body?.messages) || body.messages.length < 1 || body.messages.length > MAX_MESSAGES) {
    return response.status(400).json({ error: "Invalid conversation." });
  }

  const messages = [];
  for (const item of body.messages) {
    const role = item?.role === "assistant" ? "model" : item?.role === "user" ? "user" : null;
    const text = String(item?.text || "").trim();
    if (!role || !text || text.length > MAX_MESSAGE_LENGTH) {
      return response.status(400).json({ error: "Invalid conversation message." });
    }
    const previous = messages[messages.length - 1];
    if (previous?.role === role) {
      previous.parts[0].text += `\n\n${text}`;
    } else {
      messages.push({ role, parts: [{ text }] });
    }
  }

  // Gemini conversations must begin with a user turn; the UI greeting is display-only context.
  while (messages[0]?.role === "model") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return response.status(400).json({ error: "A user message is required." });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SHASHVAT_PERSONA }] },
          contents: messages,
          generationConfig: { maxOutputTokens: 700 },
        }),
      },
    );

    const data = await geminiResponse.json().catch(() => ({}));
    if (!geminiResponse.ok) {
      console.error("Gemini API error:", geminiResponse.status, data?.error?.message || "Unknown error");
      const message = geminiResponse.status === 429
        ? "Shashvat AI is busy right now. Please try again in a moment."
        : "Shashvat AI could not respond. Please try again.";
      return response.status(geminiResponse.status === 429 ? 429 : 502).json({ error: message });
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || "")
      .join("")
      .trim();

    if (!reply) {
      return response.status(502).json({ error: "Shashvat AI returned an empty response. Please try again." });
    }

    return response.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini request failed:", error?.message || error);
    return response.status(502).json({ error: "The AI connection is unavailable. Please try again." });
  }
}
