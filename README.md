# La Melrose Jodhpur — Google Review QR

AI-powered review booster designed specifically for **La Melrose**, a Victorian-inspired café & comfort brasserie located at Circuit House, Rai Ka Bagh, Jodhpur.

## Features
- **Aesthetic Victorian / Brasserie Styling**: Cream & antique ivory tones, Cormorant Garamond serif headers, warm brass and sage accents matching the venue's interior decor.
- **Customized Experience Chips**: Reflects popular dishes from real reviews (Thin Crust Pizza, Pistachio Matcha, Lotus Stem, Sizzling Brownie, Artisan Coffees, Victorian Decor).
- **Fast Groq LLM Inference**: Generates authentic, warm, and natural customer reviews via `/api/review`.
- **Instant Clipboard Action**: Review text is auto-copied to the customer's phone clipboard with subtle confirmation badge.
- **Direct Maps Redirection**: Direct deep link to Google Maps app (`https://maps.app.goo.gl/JDRxbDaR2G3fsU2x5`).

## Deployment
1. Connect this GitHub repo to **Vercel**.
2. Add Environment Variable:
   - `GROQ_API_KEY`: Your Groq API key from [console.groq.com](https://console.groq.com)
3. Deploy!
