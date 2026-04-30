const OpenAI = require("openai");
const buildAnalysisPrompt = require("../utils/buildAnalysisPrompt");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateAnalysis = async ({ data, result }) => {
  const prompt = buildAnalysisPrompt({ data, result });

  if (process.env.AI_ENABLED !== "true") {
    return {
      enabled: false,
      provider: "openai",
      model: process.env.AI_MODEL || null,
      prompt,
      analysis: null,
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      enabled: false,
      provider: "openai",
      model: process.env.AI_MODEL || null,
      prompt,
      analysis: null,
      error: "OPENAI_API_KEY não configurada",
    };
  }

  const response = await client.responses.create({
    model: process.env.AI_MODEL || "gpt-5.5",
    input: prompt,
  });

  return {
    enabled: true,
    provider: "openai",
    model: process.env.AI_MODEL || "gpt-5.5",
    prompt,
    analysis: response.output_text,
  };
};