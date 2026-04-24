const scoreService = require("../services/scoreService");

exports.calculateScore = (req, res) => {
  try {
    const result = scoreService.calculate(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular score" });
  }
};
