require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db"); // Načtení konfigurace databáze

const app = express();
const PORT = process.env.PORT || 3000;

// Spuštění připojení k MongoDB
connectDB();

// Nastavení EJS šablon...
app.set("view engine", "ejs");
// ...zbytek tvého kódu pro middlewares a routy
