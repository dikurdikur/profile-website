require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging


require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI; // Mengambil connection string dari .env

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect(); // Koneksi ke MongoDB
        await client.db("admin").command({ ping: 1 }); // Test koneksi
        console.log("✅ Connected to MongoDB!");
    } finally {
        await client.close(); // Tutup koneksi setelah selesai
    }
}

run().catch(console.dir);
