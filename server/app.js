import { MongoClient } from "mongodb";
import cryptoSchema from "./models/cryptoSchema.json";
import userSchema from "./models/userSchema.json";
import walletSchema from "./models/userSchema.json";
import coinSchema from "./models/coinSchema.json";

async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
  const uri = "mongodb+srv://adminMongo:<password>@cluster0.aqn2xym.mongodb.net/?retryWrites=true&w=majority";

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "myDatabase";
  const collectionName = "Crypto";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const cryptoTable = database.createCollection(collectionName, {
    validator: {
      $jsonSchema: cryptoSchema,
    },
  });

  const userTable = database.createCollection("User", {
    validator: {
      $jsonSchema: userSchema,
    },
  });

  const walletTable = database.createCollection("Wallet", {
    validator: {
      $jsonSchema: walletSchema,
    },
  });

  const CoinTable = database.createCollection("Coin", {
    validator: {
      $jsonSchema: coinSchema,
    },
  });

  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const crypto = [
    {
      name: "Bitcoin",
      value: 30,
      amount: 35,
    },
    {
      name: "Ethereum",
      value: 30,
      amount: 40,
    },
    {
      name: "Tether",
      value: 30,
      amount: 15,
    },
    {
      name: "Binance Coin",
      value: 30,
      amount: 11,
    },
    {
      name: "USD Coin",
      value: 18,
      amount: 70,
    },
    {
      name: "XRP",
      value: 30,
      amount: 30,
    },
    {
      name: "Cardamo",
      value: 30,
      amount: 19,
    },
    {
      name: "Dogecoin",
      value: 30,
      amount: 65,
    },
    {
      name: "Polygon",
      value: 30,
      amount: 44,
    },
    {
      name: "Solana",
      value: 30,
      amount: 12,
    },
  ];

  try {
    const insertManyResult = await collection.insertMany(crypto);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

  const findQuery = { amount: { $gt: 20 } };

  try {
    const cursor = await collection.find(findQuery).sort({ name: 1 });
    await cursor.forEach((crypto) => {
      console.log(`${crypto.name} has ${crypto.value} as value and we have ${crypto.amount} registered.`);
    });
    // add a linebreak
    console.log();
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }

  // We can also find a single document.
  const findOneQuery = { name: "USD Coin" };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
      console.log("Couldn't find any crypto called 'USD Coin'.\n");
    } else {
      console.log(`Found a crypto called 'USD Coin':\n${JSON.stringify(findOneResult)}\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }

  /*
   * *** UPDATE A DOCUMENT ***
   *
   * You can update a single document or multiple documents in a single call.
   *
   * Here we update the PrepTimeInMinutes value on the document we
   * just found.
   */
  const updateDoc = { $set: { value: 18 } };

  // The following updateOptions document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const updateOptions = { returnOriginal: false };

  try {
    const updateResult = await collection.findOneAndUpdate(findOneQuery, updateDoc, updateOptions);
    console.log(`Here is the updated document:\n${JSON.stringify(updateResult.value)}\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}
run().catch(console.dir);
