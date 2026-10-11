// database/connection.js
const mysql2 = require("mysql2");
require('dotenv').config(); // Load environment variables from .env file

let connectionParams;

// Use flag to toggle between localhost and server configurations
const useLocalhost = process.env.USE_LOCALHOST === 'true';

if (useLocalhost) {
    console.log("Inside local")
    connectionParams = {
        user: "root",
        host: "localhost",
        password: "",
        database: "e_commerce",
    };
} else {
    connectionParams = {
        user: process.env.DB_SERVER_USER,
        host: process.env.DB_SERVER_HOST,
        password: process.env.DB_SERVER_PASSWORD,
        database: process.env.DB_SERVER_DATABASE,
    };
}



// A pool replaces dead connections on its own (e.g. after an RDS Multi-AZ failover)
const pool = mysql2.createPool({
    ...connectionParams,
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true,
});

// Export the pool
module.exports = pool;

