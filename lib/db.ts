import { MongoClient } from "mongodb";

const { DB_URI, DB_NAME } = process.env;
if (!DB_URI || !DB_NAME) {
  console.error("DB_URI and DB_NAME must be defined as environment variables");
}
const client = new MongoClient(DB_URI || "");

async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default client;
