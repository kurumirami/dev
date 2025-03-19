const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authController = require("./controllers/authController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Database Connection
const dbConfig = {
  host: process.env.DB_HOST || "nagamed-database-kiwikun0-8384.e.aivencloud.com",
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD || "AVNS_KtzNoq33R63CEyDpgv8",
  database: process.env.DB_NAME || "ClinicDB",
  port: process.env.DB_PORT || 17697,
};

async function connectDB() {
  try {
    global.db = await mysql.createPool(dbConfig);
    console.log("✅ Connected to MySQL Database");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1);
  }
}
connectDB();

// ✅ Request Logger Middleware
app.use((req, res, next) => {
  console.log(`🟢 Received ${req.method} request on ${req.url}`);
  next();
});

// ✅ Routes
app.post("/register", authController.register);
app.post("/login", authController.login);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ Server is running.");
});

// ✅ Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
