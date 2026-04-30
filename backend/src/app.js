require("dotenv").config();

const express = require("express");
const cors = require("cors");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

app.use("/calculate-score", scoreRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));