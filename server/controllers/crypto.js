const axios = require("axios");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

client
  .connect()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

const database = client.db("Avatar");

const cryptosDoc = database.collection("Cryptos");

const uploadTop10Cryptocurrencies = async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd", // Puedes cambiar 'usd' a otra moneda si lo prefieres
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });

    const top10Criptomonedas = response.data;
    const result = { date: new Date(Date.now()).toISOString(), cryptocurrencies: [] };

    // console.log("Top 10 Cryptocurrencies:");
    top10Criptomonedas.forEach((cripto, index) => {
      // console.log(`${index + 1}. ${cripto.name} (${cripto.symbol}): $${cripto.current_price}`);
      result.cryptocurrencies.push({ name: cripto.name, value: cripto.current_price });
    });
    // console.log(result);
    await cryptosDoc.insertOne(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting the top 10 cryptocurrencies:", error.message);
  }
};

const getCryptoData = async (req, res) => {
  const query = await cryptosDoc.find({}).toArray();
  res.json(query);
};

const getOneCrypto = async (req, res) => {
  const cryptoName = req.body.name;
  try {
    const query = await cryptosDoc.findOne({ "cryptocurrencies.name": cryptoName });
    const result = {
      date: query.date,
      name: query.name,
      value: query.value,
    };
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: "Cryptocurrency not found" });
  }
};

module.exports = { uploadTop10Cryptocurrencies, getCryptoData, getOneCrypto };
