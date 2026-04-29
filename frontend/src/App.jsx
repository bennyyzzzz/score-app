import { useState } from "react";
import axios from "axios";

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
    console.log("clicou");

  for (let field of requiredFields) {
    if (form[field] === undefined || form[field] === "") {
      alert("Preencha todos os campos antes de calcular.");
    return;
    }
  }

    try {
      const res = await axios.post("http://localhost:3001/calculate-score", form);
      setResult(res.data);
    } catch (err) {
      console.log("ERRO:", err.response?.data || err.message);
      alert("Erro ao calcular score");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Score de Potencial</h1>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Receita</h3>

            <label style={styles.label}>Receita últimos 30 dias (R$)</label>
            <input type="number" name="revenueLast30Days" placeholder="Ex: 50000" onChange={handleChange} />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Usuários</h3>

            <label style={styles.label}>Usuários totais últimos 60 dias</label>
            <input type="number" name="totalUsersLast60Days" placeholder="Ex: 20000" onChange={handleChange} />

            <label style={styles.label}>Usuários recorrentes</label>
            <input type="number" name="returningUsers" placeholder="Ex: 6000" onChange={handleChange} />

            <label style={styles.label}>Usuários mobile</label>
            <input type="number" name="mobileUsers" placeholder="Ex: 15000" onChange={handleChange} />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Origem dos usuários</h3>

            <label style={styles.label}>Usuários via orgânico</label>
            <input type="number" name="organicUsers" placeholder="Ex: 7000" onChange={handleChange} />

            <label style={styles.label}>Usuários via campanhas</label>
            <input type="number" name="campaignUsers" placeholder="Ex: 8000" onChange={handleChange} />

            <label style={styles.label}>Usuários via outros meios</label>
            <input type="number" name="otherUsers" placeholder="Ex: 5000" onChange={handleChange} />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Negócio</h3>

            <label style={styles.label}>Segmento</label>
            <select name="segment" onChange={handleChange} defaultValue="" style={styles.select}>
              <option value="" disabled>Selecione o segmento</option>
              <option value="moda">Moda</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="beleza">Beleza</option>
              <option value="alimentos">Alimentos</option>
              <option value="b2b">B2B</option>
              <option value="servicos">Serviços</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Conversão</h3>

            <label style={styles.label}>Taxa de conversão do site (%)</label>
            <input type="number" step="0.1" name="conversionRate" placeholder="Ex: 1.2" onChange={handleChange} />
          </div>

        <button type="button" style={styles.button} onClick={handleSubmit}>
          Calcular Score
        </button>

        {result && (
          <div style={styles.result}>
            <h2 style={styles.score}>{result.score}</h2>
            <div style={styles.stars}>{"⭐".repeat(result.stars)}</div>
            <p style={styles.insight}>{result.insight}</p>

            {result.metrics && (
              <div style={styles.metrics}>
                <p>Recorrência: {result.metrics.returningRate}%</p>
                <p>Orgânico: {result.metrics.organicRate}%</p>
                <p>Campanhas: {result.metrics.campaignRate}%</p>
                <p>Outros: {result.metrics.otherRate}%</p>
                <p>Mobile: {result.metrics.mobileRate}%</p>
              </div>
            )}
          </div>
        )}

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

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#332020",
    padding: 20,
  },

  card: {
    background: "#332A2A",
    padding: 30,
    borderRadius: 16,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },

  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },

  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 5,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    margin: "8px 0 4px",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    paddingBottom: 4,
  },

  label: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "left",
  },

  button: {
    width: "100%",
    marginTop: 12,
    padding: 12,
    border: "none",
    borderRadius: 8,
    background: "#A60805",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  result: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    width: "100%",
  },

  score: {
    fontSize: 48,
    color: "#A60805",
  },

  stars: {
    fontSize: 22,
    margin: "10px 0",
  },

  insight: {
    color: "#ccc",
    marginTop: 10,
    lineHeight: 1.5,
    overflowWrap: "break-word",
    whiteSpace: "normal",
  },

  metrics: {
    marginTop: 14,
    color: "#ccc",
    fontSize: 14,
    lineHeight: 1.6,
  },

  select: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#401C1B",
    color: "#fff",
    fontSize: 14,
    boxSizing: "border-box",
  },
};

export default App;