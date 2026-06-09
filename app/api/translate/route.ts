import OpenAI from "openai";
import { NextResponse } from "next/server";
import { translateCorporateBullshit } from "@/app/lib/translate";
import type { TranslationMode } from "@/app/lib/types";
import { getTranslatePrompt } from "@/app/lib/prompt";
import { API_ERRORS } from "@/app/lib/errors";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const text = body?.text;
    const mode = body?.mode ?? "cynical";

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: API_ERRORS.INVALID_INPUT.message },
        { status: API_ERRORS.INVALID_INPUT.status },
      );
    }

    // Generate non-ai translation
    const localResult = translateCorporateBullshit(
      text,
      mode as TranslationMode
    );
    
    try {
      // Generate ai translation
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
      { error: API_ERRORS.TRANSLATE_FAILED.message },
      { status: API_ERRORS.TRANSLATE_FAILED.status },
    );
  }
}

const generateAiTranslation = async (
  text: string,
  mode: TranslationMode
) => {
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

export { POST };
