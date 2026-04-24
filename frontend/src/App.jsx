import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3001/calculate-score", form);
      setResult(res.data);
    } catch (err) {
      alert("Erro ao calcular score");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Score de Potencial</h1>

        <div style={styles.inputs}>
          <input name="revenueLastMonth" placeholder="Faturamento mês" onChange={handleChange} />
          <input name="traffic" placeholder="Tráfego" onChange={handleChange} />
          <input name="returningUsers" placeholder="% Recorrentes" onChange={handleChange} />
          <input name="organic" placeholder="% Orgânico" onChange={handleChange} />
          <input name="mobile" placeholder="% Mobile" onChange={handleChange} />
          <input name="conversion" placeholder="Conversão %" onChange={handleChange} />
        </div>

        <button style={styles.button} onClick={handleSubmit}>
          Calcular Score
        </button>

        {result && (
          <div style={styles.result}>
            <h2 style={styles.score}>{result.score}</h2>
            <div style={styles.stars}>{"⭐".repeat(result.stars)}</div>
            <p style={styles.insight}>{result.insight}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#332020",
  },

  card: {
    background: "#332A2A",
    padding: 30,
    borderRadius: 16,
    width: 360,
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

  button: {
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
  },
};

export default App;