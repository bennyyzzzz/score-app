# Score de Potencial para App

Aplicação web que calcula o potencial de sucesso de um cliente em aplicativos mobile com base em métricas de negócio e comportamento.

---

## Sobre o projeto

Esta ferramenta recebe dados de performance (receita, tráfego, conversão, etc.) e retorna:

* Score de 0 a 100
* Classificação de ⭐ 1 a 5 estrelas
* Insight automático sobre o potencial do cliente

---

## Tecnologias utilizadas

**Frontend**

* React (Vite)
* CSS (custom)

**Backend**

* Node.js
* Express
* CORS

---

## Estrutura do projeto

```
score-app/
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   └── app.js
│
├── frontend/
│   ├── src/
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

## Rodando o BACKEND

### Acesse a pasta:

```bash
cd backend
```

### Instale as dependências:

```bash
npm install
```

### Inicie o servidor:

```bash
node src/app.js
```

O backend estará disponível em:

```
http://localhost:3001
```

---

## Rodando o FRONTEND

### Em outro terminal:

```bash
cd frontend
```

### Instale as dependências:

```bash
npm install
```

### Inicie o projeto:

```bash
npm run dev
```

O frontend estará disponível em:

```
http://localhost:5173
```

---

## Funcionamento

1. Preencha os campos com os dados do cliente
2. Clique em **Calcular Score**
3. Visualize o resultado com score, estrelas e insight

---

## Observações

* O backend deve estar rodando antes do frontend
* A aplicação utiliza comunicação via API (`localhost:3001`)
* O primeiro acesso pode demorar caso esteja hospedado externamente

---

## Autor

Desenvolvido por Matheus Hennich