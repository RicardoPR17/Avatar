const cryptos = require("../controllers/crypto");
const express = require("express");
const router = express.Router();

// Ruta GET: /db/cryptos
router.get("/db/cryptos", cryptos.getCryptoData);

// Ruta POST: /db/cryptos
router.post("/db/cryptos", cryptos.uploadTop10Cryptocurrencies);

module.exports = { router };
