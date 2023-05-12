import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.MONGO_URI;
let client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


client = await client.connect().catch((err) => {
    console.log(err);
    process.exit(1);
});
const productDb = client.db("product");

const productCollection = productDb.collection("product");

export default productCollection;
