import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

let client;

export const connectDatabase = async () => {
    try {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1, 
                strict: true,
                deprecationErrors: true
            }
        });
        await client.connect();
        console.log('Conectando a MongoDB Atlas...');
        return client;
    } catch (error) {
        throw new Error(`No se pudo conectar a la base de datos: ${error.message}`);
    }
};

export const getClient = () => {
    if (!client) {
        throw new Error('La base de datos no esta conectada');
    }
    return client;
};

export const getDatabase = () => {
    return getClient().db('cine-db');
};