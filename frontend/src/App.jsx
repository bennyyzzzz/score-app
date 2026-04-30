import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "segment" ? value : value === "" ? "" : Number(value),
    });
  };

  const handleSubmit = async () => {
    for (let field of requiredFields) {
      if (form[field] === undefined || form[field] === "") {
        alert("Preencha todos os campos antes de calcular.");
        return;
      }
    }

    const total =
      (form.organicUsers || 0) +
      (form.campaignUsers || 0) +
      (form.otherUsers || 0);

    if (total > form.totalUsersLast60Days) {
      alert("A soma das origens não pode ser maior que o total de usuários.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/calculate-score", form);
      setResult(res.data);
    } catch (err) {
      console.log("ERRO:", err.response?.data || err.message);
      alert("Erro ao calcular score");
    }
  };

  const generatePDF = () => {
    if (!result) {
      alert("Calcule o score antes de gerar o PDF.");
      return;
    }

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Potencial para App", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Score: ${result.score}/100`, 20, 40);
    doc.text(`Classificação: ${result.stars} estrelas`, 20, 50);

    doc.setFont("helvetica", "bold");
    doc.text("Insight", 20, 70);

    doc.setFont("helvetica", "normal");
    const insightLines = doc.splitTextToSize(result.insight, 170);
    doc.text(insightLines, 20, 80);

    let y = 100 + insightLines.length * 6;

    doc.setFont("helvetica", "bold");
    doc.text("Métricas calculadas", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.text(`Recorrência: ${result.metrics.returningRate}%`, 20, y);
    doc.text(`Orgânico: ${result.metrics.organicRate}%`, 20, y + 10);
    doc.text(`Campanhas: ${result.metrics.campaignRate}%`, 20, y + 20);
    doc.text(`Outros meios: ${result.metrics.otherRate}%`, 20, y + 30);
    doc.text(`Mobile: ${result.metrics.mobileRate}%`, 20, y + 40);

    doc.save("relatorio-score-potencial.pdf");
  };

  return (
    <div className="app-page">
      <div className="app-layout">
        <div className="led-card form-card">
          <h1>Score de Potencial</h1>

          <div className="section">
            <h3>Receita</h3>

            <div className="inputs-grid">
              <div className="field">
                <label>Receita últimos 30 dias (R$)</label>
                <input min="0" type="number" name="revenueLast30Days" placeholder="Ex: 50000" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Taxa de conversão do site (%)</label>
                <input min="0" type="number" step="0.1" name="conversionRate" placeholder="Ex: 1.2" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Usuários</h3>

            <div className="inputs-grid">
              <div className="field">
                <label>Usuários totais últimos 60 dias</label>
                <input min="0" type="number" name="totalUsersLast60Days" placeholder="Ex: 20000" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Usuários recorrentes</label>
                <input min="0" type="number" name="returningUsers" placeholder="Ex: 6000" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Usuários mobile</label>
                <input min="0" type="number" name="mobileUsers" placeholder="Ex: 15000" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Segmento</label>
                <select name="segment" onChange={handleChange} defaultValue="">
                  <option value="" disabled>Selecione o segmento</option>
                  <option value="moda">Moda</option>
                  <option value="eletronicos">Eletrônicos</option>
                  <option value="beleza">Beleza</option>
                  <option value="alimentos">Alimentos</option>
                  <option value="moveis">Móveis</option>
                  <option value="decoracao">Decoração</option>
                  <option value="automotivo">Automotivo</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="b2b">B2B</option>
                  <option value="servicos">Serviços</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Origem dos usuários</h3>

            <div className="inputs-grid">
              <div className="field">
                <label>Usuários via orgânico</label>
                <input min="0" type="number" name="organicUsers" placeholder="Ex: 7000" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Usuários via campanhas</label>
                <input min="0" type="number" name="campaignUsers" placeholder="Ex: 8000" onChange={handleChange} />
              </div>

              <div className="field full-width">
                <label>Usuários via outros meios</label>
                <input min="0" type="number" name="otherUsers" placeholder="Ex: 5000" onChange={handleChange} />
              </div>
            </div>
          </div>

          <button type="button" className="primary-button" onClick={handleSubmit}>
            Calcular Score
          </button>
        </div>

        <div className="led-card result-card">
          {!result ? (
            <p className="empty-result">Preencha os dados para ver o resultado</p>
          ) : (
            <>
              <h2 className="score">{result.score}</h2>
              <div className="stars">{"⭐".repeat(result.stars)}</div>
              <p className="insight">{result.insight}</p>
              {result.ai?.analysis && (
                <div className="ai-analysis">
                  <h3>Análise personalizada</h3>
                  <p>{result.ai.analysis}</p>
                </div>
              )}

              {result.metrics && (
                <div className="metrics">
                  <p>Recorrência: {result.metrics.returningRate}%</p>
                  <p>Orgânico: {result.metrics.organicRate}%</p>
                  <p>Campanhas: {result.metrics.campaignRate}%</p>
                  <p>Mobile: {result.metrics.mobileRate}%</p>
                </div>
              )}
            </>
          )}

          <button type="button" className="pdf-button" onClick={generatePDF}>
            Baixar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

const requiredFields = [
  "revenueLast30Days",
  "totalUsersLast60Days",
  "returningUsers",
  "organicUsers",
  "campaignUsers",
  "otherUsers",
  "segment",
  "mobileUsers",
  "conversionRate",
];

export default App;