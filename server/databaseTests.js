const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://adminMongo:<password>>@cluster0.aqn2xym.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected successfully to server");

    // Select the database and collection
    const database = client.db("myDatabase");
    const collection = database.collection("Crypto");

    // Query the collection for documents
    const result = await collection.countDocuments();
    console.log("Amount of cryptos registered:", result);

    const idQuery = await collection.findOne({ name: "Bitcoin" });
    console.log(`Bitcoin document: ${JSON.stringify(idQuery)}`);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    console.log("Bye bye");
  }
}

run().catch(console.error());
