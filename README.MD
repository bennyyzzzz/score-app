# Score de Potencial para App

Aplicação web que avalia o potencial de sucesso de um cliente em aplicativos mobile com base em métricas reais de negócio e comportamento.

---

## Sobre o projeto

Esta ferramenta transforma dados brutos de performance em uma análise clara e acionável para times comerciais e de sucesso do cliente.

A aplicação recebe dados como receita, usuários e conversão, e retorna:

* Score de 0 a 100
* Classificação de 1 a 5 estrelas
* Insight automático sobre o potencial
* Métricas calculadas (recorrência, mobile, origem, etc.)
* Relatório em PDF para compartilhamento

---

## Objetivo

Ajudar times comerciais a:

* Avaliar rapidamente o potencial de um cliente para app
* Identificar oportunidades e riscos
* Gerar relatórios profissionais para clientes
* Padronizar análises sem necessidade de cálculos manuais

---

## Como funciona

O usuário preenche dados brutos (não percentuais):

* Receita últimos 30 dias
* Usuários totais (60 dias)
* Usuários recorrentes
* Origem dos usuários (orgânico, campanhas, outros)
* Usuários mobile
* Segmento do negócio
* Taxa de conversão (%)

O sistema automaticamente calcula:

* Percentual de recorrência
* Percentual de mobile
* Percentual por origem
* Score final baseado em pesos e regras de negócio

---

## Tecnologias utilizadas

### Frontend

* React (Vite)
* CSS custom

### Backend

* Node.js
* Express
* CORS

### Extras

* jsPDF (geração de relatório em PDF)

---

## Estrutura do projeto

```bash
score-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   │       └── scoreService.js
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   ├── public/
│   └── index.html
```

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd score-app
```

---

## Rodando o backend

```bash
cd backend
npm install
node src/app.js
```

Backend disponível em:

```
http://localhost:3001
```

---

## Rodando o frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em:

```
http://localhost:5173
```

---

## Funcionalidades

* Cálculo automático de score
* Classificação por estrelas
* Insight baseado em dados
* Métricas derivadas automáticas
* Layout com duas colunas
* Validação de dados de entrada
* Exportação de relatório em PDF

---

## Exemplo de fluxo

```txt
Entrada de dados → Cálculo → Score → Insight → PDF
```

---

## Observações importantes

* Todos os inputs de usuários devem ser quantidade absoluta, não percentual
* Apenas a conversão deve ser informada em percentual
* A soma das origens não pode ultrapassar o total de usuários
* O backend deve estar rodando antes do frontend

---

## Próximos passos

* Integração com IA para análise personalizada
* Dashboard com histórico de clientes
* Exportação avançada de relatórios
* Deploy em produção
* Integração com APIs externas

---

## Autor

Desenvolvido por Matheus Hennich

-----------------------------------------------------------------------------------------------------------------------------------------

# App Potential Score

Web application that evaluates the potential success of a client in mobile applications based on real business and user behavior metrics.

---

## About the project

This tool transforms raw performance data into a clear and actionable analysis for commercial and customer success teams.

The application processes data such as revenue, users, and conversion, and returns:

* Score from 0 to 100
* Rating from 1 to 5 stars
* Automated insight about the potential
* Calculated metrics (recurrence, mobile, traffic sources, etc.)
* PDF report for sharing

---

## Objective

Help commercial teams to:

* Quickly evaluate a client's potential for mobile apps
* Identify opportunities and risks
* Generate professional reports for clients
* Standardize analysis without manual calculations

---

## How it works

The user provides raw data (not percentages):

* Revenue (last 30 days)
* Total users (last 60 days)
* Returning users
* Traffic sources (organic, campaigns, others)
* Mobile users
* Business segment
* Conversion rate (%)

The system automatically calculates:

* Returning user rate
* Mobile usage rate
* Traffic source distribution
* Final score based on weights and business rules

---

## Technologies used

### Frontend

* React (Vite)
* Custom CSS

### Backend

* Node.js
* Express
* CORS

### Extras

* jsPDF (PDF report generation)

---

## Project structure

```bash
score-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   │       └── scoreService.js
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   ├── public/
│   └── index.html
```

---

## How to run the project

### 1. Clone the repository

```bash
git clone <repository-url>
cd score-app
```

---

## Running the backend

```bash
cd backend
npm install
node src/app.js
```

Backend available at:

```
http://localhost:3001
```

---

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend available at:

```
http://localhost:5173
```

---

## Features

* Automatic score calculation
* Star rating classification
* Data-driven insight generation
* Automatically calculated metrics
* Two-column layout interface
* Input validation
* PDF report export

---

## Example flow

```txt
Input data → Calculation → Score → Insight → PDF
```

---

## Important notes

* All user-related inputs must be absolute values, not percentages
* Only the conversion rate should be entered as a percentage
* The sum of traffic sources cannot exceed total users
* The backend must be running before the frontend

---

## Next steps

* Integration with AI for personalized analysis
* Dashboard with client history
* Advanced report export
* Production deployment
* Integration with external APIs

---

## Author

Developed by Matheus Hennich
