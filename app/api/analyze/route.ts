import OpenAI from "openai";
import { NextResponse } from "next/server";
import { API_ERRORS } from "@/app/lib/errors";
import { ANALYSIS_SYSTEM_PROMPT } from "@/app/lib/prompt";
import { AnalysisResult, TranslationResult } from "@/app/lib/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type AnalyzeRequestBody = {
  text?: string;
};

const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const input = body.text?.trim();

    if (!input) {
      return NextResponse.json(
        { error: API_ERRORS.ANALYSIS_EMPTY_INPUT.message },
        { status: API_ERRORS.ANALYSIS_EMPTY_INPUT.status },
      );
    }

    const analysis = await analyzeCorporateText(input);

    const result: TranslationResult = {
      original: input,
      analysis,
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: API_ERRORS.ANALYSIS_FAILED.message },
      { status: API_ERRORS.ANALYSIS_FAILED.status },
    );
  }
}

const analyzeCorporateText = async ( input: string ) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: ANALYSIS_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: input,
      },
    ],
    response_format: {
      type: "json_object",
    },
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No analysis returned");
  }

  return JSON.parse(content) as AnalysisResult;
}

export { POST };
