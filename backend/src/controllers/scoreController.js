const scoreService = require("../services/scoreService");
const aiAnalysisService = require("../services/aiAnalysisService");

exports.calculateScore = async (req, res) => {
  try {
    const result = scoreService.calculate(req.body);

    let ai = null;

    try {
      ai = await aiAnalysisService.generateAnalysis({
        data: req.body,
        result,
      });
    } catch (aiError) {
      console.log("Erro na IA:", aiError.message);

      ai = {
        enabled: false,
        provider: "openai",
        model: process.env.AI_MODEL || null,
        analysis: null,
        error: "Falha ao gerar análise por IA",
      };
    }

    res.json({
      ...result,
      ai,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao calcular score" });
  }
};