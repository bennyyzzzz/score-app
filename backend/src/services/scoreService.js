const normalize = (value, min, max) => {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) / (max - min)) * 100;
};

const safePercent = (value, total) => {
  if (!total || total <= 0) return 0;
  return (value / total) * 100;
};

const getStars = (score) => {
  if (score <= 20) return 1;
  if (score <= 40) return 2;
  if (score <= 60) return 3;
  if (score <= 80) return 4;
  return 5;
};

const getSegmentScore = (segment) => {
  const scores = {
    moda: 85,
    eletronicos: 75,
    beleza: 80,
    alimentos: 65,
    b2b: 55,
    servicos: 60,
    outros: 60,
  };

  return scores[segment] || 60;
};

const generateInsight = (data, metrics, score) => {
  const points = [];

  if (metrics.mobileRate >= 60) points.push("forte presença mobile");
  if (metrics.returningRate >= 30) points.push("boa recorrência de usuários");
  if (metrics.organicRate >= 35) points.push("boa aquisição orgânica");
  if (data.revenueLast30Days >= 50000) points.push("boa receita recente");
  if (data.conversionRate < 0.7) points.push("baixa conversão");

  if (points.length === 0) {
    return "Potencial ainda limitado. É recomendado melhorar tráfego, conversão e presença mobile antes de priorizar um app.";
  }

  if (score > 80) {
    return `Alto potencial devido a ${points.join(", ")}.`;
  }

  if (score > 50) {
    return `Potencial moderado com ${points.join(", ")}.`;
  }

  return `Baixo potencial, apesar de apresentar ${points.join(", ")}.`;
};

exports.calculate = (data) => {
  const revenueLast30Days = Number(data.revenueLast30Days) || 0;
  const totalUsersLast60Days = Number(data.totalUsersLast60Days) || 0;
  const returningUsers = Number(data.returningUsers) || 0;
  const organicUsers = Number(data.organicUsers) || 0;
  const campaignUsers = Number(data.campaignUsers) || 0;
  const otherUsers = Number(data.otherUsers) || 0;
  const mobileUsers = Number(data.mobileUsers) || 0;
  const conversionRate = Number(data.conversionRate) || 0;
  const segment = data.segment || "outros";

  const metrics = {
    returningRate: Math.round(safePercent(returningUsers, totalUsersLast60Days)),
    organicRate: Math.round(safePercent(organicUsers, totalUsersLast60Days)),
    campaignRate: Math.round(safePercent(campaignUsers, totalUsersLast60Days)),
    otherRate: Math.round(safePercent(otherUsers, totalUsersLast60Days)),
    mobileRate: Math.round(safePercent(mobileUsers, totalUsersLast60Days)),
  };

  const score_receita = normalize(revenueLast30Days, 0, 100000);
  const score_trafego = normalize(totalUsersLast60Days, 0, 100000);
  const score_engajamento = metrics.returningRate;
  const score_origem = metrics.organicRate + metrics.campaignRate * 0.5;
  const score_segmento = getSegmentScore(segment);
  const score_mobile = metrics.mobileRate;
  const score_conversao = normalize(conversionRate, 0, 3);

  let score =
    score_receita * 0.3 +
    score_trafego * 0.15 +
    score_engajamento * 0.15 +
    score_origem * 0.1 +
    score_segmento * 0.1 +
    score_mobile * 0.1 +
    score_conversao * 0.1;

  if (metrics.mobileRate < 40) score *= 0.8;
  if (conversionRate < 0.7) score *= 0.85;

  score = Math.round(score);

  return {
    score,
    stars: getStars(score),
    insight: generateInsight(
      { revenueLast30Days, conversionRate },
      metrics,
      score
    ),
    metrics,
  };
};