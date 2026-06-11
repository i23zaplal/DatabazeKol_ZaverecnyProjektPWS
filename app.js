require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.set("view engine", "ejs");


app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const bikeRoutes = require('./routes/bikeRoutes');
app.use('/', bikeRoutes);


app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});