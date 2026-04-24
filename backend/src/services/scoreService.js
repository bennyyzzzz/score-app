const normalize = (value, min, max) => {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) / (max - min)) * 100;
};

const getStars = (score) => {
  if (score <= 20) return 1;
  if (score <= 40) return 2;
  if (score <= 60) return 3;
  if (score <= 80) return 4;
  return 5;
};

const generateInsight = (data, score) => {
  let insights = [];

  if (data.mobile > 60) insights.push("forte presença mobile");
  if (data.conversion < 1) insights.push("baixa conversão");
  if (data.revenueLastMonth > 50000) insights.push("boa receita");

  if (score > 80) return `Alto potencial devido a ${insights.join(", ")}`;
  if (score > 50) return `Potencial moderado com ${insights.join(", ")}`;
  return `Baixo potencial devido a ${insights.join(", ")}`;
};

exports.calculate = (data) => {
  const score_receita = normalize(data.revenueLastMonth, 0, 100000);
  const score_trafego = normalize(data.traffic, 0, 100000);
  const score_engajamento = data.returningUsers;
  const score_origem = data.organic;
  const score_segmento = 70; // mock inicial
  const score_mobile = data.mobile;
  const score_conversao = normalize(data.conversion, 0, 3);

  let score =
    score_receita * 0.3 +
    score_trafego * 0.15 +
    score_engajamento * 0.15 +
    score_origem * 0.1 +
    score_segmento * 0.1 +
    score_mobile * 0.1 +
    score_conversao * 0.1;

  // Penalizações
  if (data.mobile < 40) score *= 0.8;
  if (data.conversion < 0.7) score *= 0.85;

  score = Math.round(score);

  return {
    score,
    stars: getStars(score),
    insight: generateInsight(data, score),
  };
};
