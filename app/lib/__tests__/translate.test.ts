import { describe, it, expect } from "vitest";
import { translateCorporateBullshit } from "../translate";

describe("translateCorporateBullshit function", () => {
  it("returns the original text", () => {
    const result = translateCorporateBullshit(
      "We need stakeholder alignment."
    );

    expect(result.original).toBe(
      "We need stakeholder alignment."
    );
  });

  it("detects corporate buzzwords", () => {
    const result = translateCorporateBullshit(
      "We need to leverage cross-functional synergies."
    );

    expect(result.buzzwords).toEqual(
      expect.arrayContaining([
        "leverage",
        "cross-functional",
        "synergies",
      ])
    );
  });

  it("calculates a bullshit score based on detected buzzwords", () => {
    const result = translateCorporateBullshit(
      "leverage synergies alignment"
    );

    expect(result.score).toBe(69);
  });

  it("caps the bullshit score at 100", () => {
    const result = translateCorporateBullshit(
      `
      leverage synergy synergies alignment stakeholder
      stakeholders cross-functional strategic optimization
      optimize streamline efficiency scalable growth
      initiative transformation operational excellence
      north star low-hanging fruit circle back
      move the needle
      `
    );

    expect(result.score).toBe(100);
  });

  it("defaults to cynical mode", () => {
    const result = translateCorporateBullshit(
      "We need alignment."
    );

    expect(result.mode).toBe("cynical");
  });

  it("returns cynical translation", () => {
    const result = translateCorporateBullshit(
      "We need alignment.",
      "cynical"
    );

    expect(result.translation).toBe(
      "Nobody agrees yet, so this is going to become a meeting."
    );
  });

  it("returns direct translation", () => {
    const result = translateCorporateBullshit(
      "We need alignment.",
      "direct"
    );

    expect(result.translation).toBe(
      "Nobody agrees on ownership yet."
    );
  });

  it("returns executive translation", () => {
    const result = translateCorporateBullshit(
      "We need alignment.",
      "executive"
    );

    expect(result.translation).toBe(
      "Cross-functional alignment remains unresolved across stakeholder groups."
    );
  });

  it("returns gen-z translation", () => {
    const result = translateCorporateBullshit(
      "We need alignment.",
      "gen-z"
    );

    expect(result.translation).toContain("bro");
  });

  it("returns minimum score when no buzzwords exist", () => {
    const result = translateCorporateBullshit(
      "what up dawg"
    );

    expect(result.score).toBe(15);
    expect(result.buzzwords).toEqual([]);
  });
});