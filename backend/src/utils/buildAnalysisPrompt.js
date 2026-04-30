const buildAnalysisPrompt = ({ data, result }) => {
  return `
Você é um analista comercial especializado em performance mobile para App.

Analise os dados abaixo e gere uma análise personalizada, clara e objetiva dos pontos fortes e fracos e por que ele teria ou não um bom desempenho com o App de Vendas.

Dados do cliente:
- Segmento: ${data.segment}
- Receita últimos 30 dias: R$ ${data.revenueLast30Days}
- Usuários últimos 60 dias: ${data.totalUsersLast60Days}
- Usuários recorrentes: ${data.returningUsers}
- Usuários mobile: ${data.mobileUsers}
- Usuários orgânicos: ${data.organicUsers}
- Usuários via campanhas: ${data.campaignUsers}
- Usuários via outros meios: ${data.otherUsers}
- Conversão: ${data.conversionRate}%

Resultado calculado:
- Score: ${result.score}/100
- Estrelas: ${result.stars}
- Recorrência: ${result.metrics.returningRate}%
- Orgânico: ${result.metrics.organicRate}%
- Campanhas: ${result.metrics.campaignRate}%
- Outros: ${result.metrics.otherRate}%
- Mobile: ${result.metrics.mobileRate}%

Retorne a análise no formato:

Resumo:
Pontos fortes:
Pontos de atenção:
Recomendação comercial:
Próximos passos:
`;
};

module.exports = buildAnalysisPrompt;