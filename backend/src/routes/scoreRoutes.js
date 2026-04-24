const express = require("express");
const router = express.Router();
const { calculateScore } = require("../controllers/scoreController");

router.post("/", calculateScore);

module.exports = router;