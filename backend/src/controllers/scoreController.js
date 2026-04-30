const scoreService = require("../services/scoreService");
const aiAnalysisService = require("../services/aiAnalysisService");

exports.calculateScore = async (req, res) => {
  try {
    const result = scoreService.calculate(req.body);

    const ai = await aiAnalysisService.generateAnalysis({
      data: req.body,
      result,
    });

    res.json({
      ...result,
      ai,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao calcular score" });
  }
};