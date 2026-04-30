const buildAnalysisPrompt = require("../utils/buildAnalysisPrompt");

exports.generateAnalysis = async ({ data, result }) => {
  const prompt = buildAnalysisPrompt({ data, result });

  if (process.env.AI_ENABLED !== "true") {
    return {
      enabled: false,
      provider: process.env.AI_PROVIDER || null,
      prompt,
      analysis: null,
    };
  }

  try {
    let analysis;

    if (process.env.AI_PROVIDER === "gemini") {
      const geminiProvider = require("./providers/geminiProvider");
      analysis = await geminiProvider.generate(prompt);
    } else if (process.env.AI_PROVIDER === "openai") {
      const openaiProvider = require("./providers/openaiProvider");
      analysis = await openaiProvider.generate(prompt);
    } else {
      throw new Error("AI_PROVIDER inválido");
    }

    return {
      enabled: true,
      provider: process.env.AI_PROVIDER,
      prompt,
      analysis,
    };
  } catch (err) {
    console.log("Erro IA:", err.message);

    return {
      enabled: false,
      provider: process.env.AI_PROVIDER,
      prompt,
      analysis: null,
      error: err.message,
    };
  }
};