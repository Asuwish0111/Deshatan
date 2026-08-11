import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/db";

/* Grounded travel answering.
 *
 * This is not a trained model and does not need to be — the model is a general
 * one, given this catalogue as context on every call. That means it answers
 * from what we actually sell, updates the moment the catalogue changes, and
 * cannot invent a trip that does not exist. Fine-tuning would cost more, go
 * stale immediately, and still hallucinate prices.
 *
 * Set ANTHROPIC_API_KEY or OPENAI_API_KEY to switch it on. With neither, the
 * route reports itself unconfigured and the planner keeps using its own
 * deterministic matching — so the page works either way.
 */

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

function catalogue() {
  const db = seedDatabase();
  const trips = db.destinations
    .filter((d) => !d.hidden)
    .map(
      (d) =>
        `- ${d.title} (id ${d.id}) — ${d.region}, ${d.area}. ${d.days} days, from ₹${d.priceFrom} per person, rated ${d.rating} from ${d.reviews} reviews. ${d.blurb}`,
    )
    .join("\n");
  const stays = db.stays
    .map(
      (st) =>
        `- ${st.title} (id ${st.id}) — ${st.type} in ${st.city}, ${st.region}. ₹${st.pricePerNight}/night, rated ${st.rating}. ${st.amenities.join(", ")}.`,
    )
    .join("\n");
  return { trips, stays };
}

function systemPrompt() {
  const { trips, stays } = catalogue();
  return `You are the trip planner for Deshatan, an Indian travel company covering 28 states, 8 union territories, Nepal and Bhutan.

Answer travel questions helpfully and briefly — two or three sentences unless asked for more. Speak plainly, like a well-travelled colleague, not a brochure.

These are the ONLY trips and stays we sell:

TRIPS
${trips}

STAYS
${stays}

Rules you must not break:
- Never invent a trip, stay, price or rating. If it is not listed above, say we do not run it and suggest the closest thing we do.
- Quote prices only as they appear above, and say they are "from" per person.
- General travel questions — weather, visas, altitude, what to pack, best months — answer from your own knowledge, and say when something should be confirmed closer to the date.
- If asked for something we cannot do, say so directly.
- When recommending, name the trip so the interface can link to it.`;
}

async function callAnthropic(key: string, messages: ChatMessage[]) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.PLANNER_MODEL ?? "claude-sonnet-5",
      max_tokens: 600,
      system: systemPrompt(),
      messages,
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? "";
}

async function callOpenAI(key: string, messages: ChatMessage[]) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.PLANNER_MODEL ?? "gpt-4o-mini",
      max_tokens: 600,
      messages: [{ role: "system", content: systemPrompt() }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export async function POST(req: NextRequest) {
  const anthropic = process.env.ANTHROPIC_API_KEY;
  const openai = process.env.OPENAI_API_KEY;

  if (!anthropic && !openai) {
    // not an error — the planner has its own answer for this case
    return NextResponse.json({ configured: false });
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
  } catch {
    return NextResponse.json({ configured: true, error: "bad request" }, { status: 400 });
  }
  if (!messages.length) {
    return NextResponse.json({ configured: true, error: "no messages" }, { status: 400 });
  }

  try {
    const reply = anthropic
      ? await callAnthropic(anthropic, messages)
      : await callOpenAI(openai!, messages);
    return NextResponse.json({ configured: true, reply });
  } catch (err) {
    // the planner falls back rather than showing the customer a failure
    console.error("[plan] model call failed:", err);
    return NextResponse.json({ configured: true, error: "upstream" }, { status: 502 });
  }
}
