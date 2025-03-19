const mysql = require("mysql2/promise");

const dbConfig = {
    host: "nagamed-database-kiwikun0-8384.e.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_KtzNoq33R63CEyDpgv8",
    database: "ClinicDB",
    port: 17697,
};

async function testDB() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("✅ Database Connected");
        const [rows] = await connection.query("SHOW TABLES");
        console.log("Tables in ClinicDB:", rows);
        await connection.end();
    } catch (error) {
        console.error("❌ Database Connection Error:", error.message);
    }
}

testDB();
