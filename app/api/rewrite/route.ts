import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { TranslationResult } from "@/app/lib/types";
import { generateRewritePrompt } from "@/app/lib/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const text = body?.text;
    const mode = body?.mode ?? "executive";

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required." },
        { status: 400 }
      );
    }

    const rewrite = await generateExecutiveRewrite(text);

    const result: TranslationResult = {
      original: text,
      translation: rewrite,
      score: 100,
      mode,
      buzzwords: [],
      fallbackUsed: false,
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate executive rewrite." },
      { status: 500 }
    );
  }
}

async function generateExecutiveRewrite(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: generateRewritePrompt(),
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.choices[0].message.content?.trim() ?? "";
}