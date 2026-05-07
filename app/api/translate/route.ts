import { NextResponse } from "next/server";
import { translateCorporateBullshit } from "@/app/lib/translate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = body?.text;
    const mode = body?.mode ?? 'cynical';

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required." },
        { status: 400 }
      );
    }

    const result = translateCorporateBullshit(text, mode);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to translate corporate bullshit." },
      { status: 500 }
    );
  }
}