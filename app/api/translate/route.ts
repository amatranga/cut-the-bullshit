import OpenAI from "openai";
import { NextResponse } from "next/server";
import { translateCorporateBullshit } from "@/app/lib/translate";
import type { TranslationMode } from "@/app/lib/types";
import { getTranslatePrompt } from "@/app/lib/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const text = body?.text;
    const mode = body?.mode ?? "cynical";

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required." },
        { status: 400 }
      );
    }

    const localResult = translateCorporateBullshit(
      text,
      mode as TranslationMode
    );

    try {
      const aiTranslation = await generateAiTranslation(
        text,
        mode as TranslationMode
      );

      if (!aiTranslation) {
        return NextResponse.json({
          ...localResult,
          fallbackUsed: true,
        });
      }

      return NextResponse.json({
        ...localResult,
        translation: aiTranslation,
        fallbackUsed: false,
      });
    } catch {
      return NextResponse.json({
        ...localResult,
        fallbackUsed: true,
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to process translation request." },
      { status: 500 }
    );
  }
}

async function generateAiTranslation(
  text: string,
  mode: TranslationMode
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: getTranslatePrompt(mode),
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.choices[0].message.content?.trim() ?? "";
}