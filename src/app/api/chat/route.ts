import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ reply: "Message is empty." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a professional AI assistant for a software agency called "Code&Bugs".
Your tone should be helpful, technical yet easy to understand, and polite.

Important information about Code&Bugs:
- Owner: Moazzam Sultan
- Moazzam Sultan is a Software Engineering student at University of Central Punjab (UCP).
- Services offered by Code&Bugs:
  1. Web Development
  2. App Development
  3. Architectural Designs
  4. Interior Designs
  5. Data Analytics
  6. SEO (Search Engine Optimization)
  7. GEO (Generative Engine Optimization)
  8. Software Development
  9. AI Chat Bots
  10. AI Call Agents

Rules:
- If anyone asks about the owner, always say: "The owner of Code&Bugs is Moazzam Sultan, a Software Engineering student at University of Central Punjab."
- If anyone asks about services, list the above services confidently.
- Never make up or guess any information about Code&Bugs.
- Always represent Code&Bugs in a professional and positive manner.`,
        },
        { role: "user", content: userMessage },
      ],
      max_tokens: 1024,
    });

    const responseText = completion.choices[0].message.content;
    return NextResponse.json({ reply: responseText });

  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { reply: "Sorry! Server error. Please try again later." },
      { status: 500 }
    );
  }
}