import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { TranslationMode, TranslationResult } from "@/app/lib/types";

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
        content: `
You are the Executive Rewrite engine for an app called "Cut the Bullshit."

Your job is to take plain, direct workplace language and rewrite it as polished corporate jargon.

Rules:
- Return only the rewritten sentence or short paragraph.
- Do not explain your reasoning.
- Do not mention that you are an AI.
- Keep it under 45 words.
- Make it sound like a polished executive memo.
- Use corporate abstraction, but keep it believable.
- Do not make it obscene or personally insulting.

Style examples:
Plain: "Nobody knows who owns this."
Rewrite: "Ownership remains under active evaluation as we align cross-functional stakeholders around execution priorities."

Plain: "We need to decide."
Rewrite: "The team should align on a decision framework to support timely execution."

Plain: "This project is a mess."
Rewrite: "The initiative would benefit from additional operational clarity and stakeholder alignment."
`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.choices[0].message.content?.trim() ?? "";
}