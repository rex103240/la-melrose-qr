export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return res.status(500).json({
      error: "GROQ_API_KEY is missing",
      hint: "Add GROQ_API_KEY in Vercel → Settings → Environment Variables, then Redeploy",
    });
  }

  const RESTAURANT_NAME = process.env.RESTAURANT_NAME || "La Melrose";
  const RESTAURANT_TYPE =
    process.env.RESTAURANT_TYPE || "Victorian-inspired café and comfort brasserie in Jodhpur";
  const RESTAURANT_SPECIALTY =
    process.env.RESTAURANT_SPECIALTY ||
    "aesthetic European interiors, thin crust pizzas, artisan coffees, signature matcha, sushis, and timeless comfort dining";

  const rawKeywords = req.query?.keywords || "";
  const keywords = rawKeywords ? rawKeywords.split(",").map(k => k.trim()).filter(Boolean) : [];
  const keywordLine = keywords.length
    ? `- Naturally highlight these specific things the customer loved: ${keywords.join(", ")}`
    : "- Mention the cozy Victorian aesthetic, coffee, food, or warm hospitality naturally";

  const prompt = `Generate a short, genuine-sounding 5-star Google review for ${RESTAURANT_NAME}, a ${RESTAURANT_TYPE} known for ${RESTAURANT_SPECIALTY}.
Rules:
- 2-4 sentences max
- Sound like a real happy visitor writing casually after a lovely meal
- Keep the tone warm, relaxed, and appreciative
${keywordLine}
- Vary the writing style each time (cozy, aesthetic-loving, foodie, casual brunch vibe)
- No markdown formatting, no bold asterisks (**), no quotation marks, no emojis, no hashtags
- No cliché phrases like "I highly recommend" or "must-visit spot"
- Do NOT start every review with "I" or "We", vary the opening sentence naturally
- Just return the plain review text, nothing else`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b",
        messages: [{ role: "user", content: prompt }],
        temperature: 1.15,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({
        error: "Groq API error",
        status: response.status,
        details: err,
      });
    }

    const data = await response.json();
    const review = data.choices[0].message.content.trim();
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({
      error: "Fetch failed",
      message: error.message,
    });
  }
}
