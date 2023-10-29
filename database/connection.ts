import { MongoClient, Database } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { MONGODB_URI } from "../utils/envConfig.ts";


let db : Database;
async function createMongodbConnection() {
    try {
        const client = new MongoClient();
        await client.connect(MONGODB_URI);
        console.log("Mongodb connection established...!")

        db = client.database('products-review');
    } catch (error) {
        console.log(error)
    }
}

export {db, createMongodbConnection};