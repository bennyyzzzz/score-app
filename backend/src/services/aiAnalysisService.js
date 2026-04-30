const buildAnalysisPrompt = require("../utils/buildAnalysisPrompt");

exports.generateAnalysis = async ({ data, result }) => {
  const prompt = buildAnalysisPrompt({ data, result });

  return {
    enabled: false,
    provider: "not-configured",
    prompt,
    analysis: null,
  };
};