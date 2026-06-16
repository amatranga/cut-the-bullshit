const API_ERRORS = {
  INVALID_INPUT: {
    status: 400,
    message: "Please provide a statement requiring strategic interpretation.",
  },
  RATE_LIMITED: {
    status: 429,
    message: "Too much executive alignment activity detected. Please circle back in a minute.",
  },
  TRANSLATE_FAILED: {
    status: 500,
    message: "The executive ambiguity engine failed to align on outcomes.",
  },
  REWRITE_FAILED: {
    status: 500,
    message: "The strategic obfuscation engine failed to generate sufficient enterprise value.",
  },
  INVALID_EVENT: {
    status: 400,
    message: "The occurrence is not currently recognized within our established operational parameters."
  },
  ANALYTICS_FAILED: {
    status: 500,
    message: "The analytics tracking mechanism has encountered performance challenges that necessitate immediate attention to ensure data integrity and insight delivery.",
  },
  ANALYSIS_EMPTY_INPUT: {
    status: 400,
    message: "Kindly share the necessary documentation for comprehensive analysis to facilitate informed decision-making.",
  },
  ANALYSIS_FAILED: {
    status: 500,
    message: "Analytical insights have not yet been synthesized and disseminated for stakeholder review",
  },
  GENERIC_ERROR: {
    status: 500,
    message: "The corporate analysis engine failed to align on insights.",
  },
} as const;

export { API_ERRORS };