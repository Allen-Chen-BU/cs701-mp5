import { Collection, Db, MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB as string;
const DB_NAME = "mp5";

export const URL_COLLECTION = "url-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGODB_URL);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
    if(!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}