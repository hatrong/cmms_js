const { Client } = require('pg');

const connectToDatabase = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }

    return client;
};

module.exports = connectToDatabase;