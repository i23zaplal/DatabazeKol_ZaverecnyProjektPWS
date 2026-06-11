require("dotenv").config(); 
const express = require("express");
const path = require("path");
const connectDB = require("./config/db"); 
const session = require('express-session'); 

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);


app.get('/', (req, res) => {
    
    if (!req.session.userId) {
        return res.redirect('/login'); 
    }
    
    
    res.send(`
        <h1>Vítej v databázi horských kol!</h1>
        <p>Jsi úspěšně přihlášen.</p>
        <a href="/logout">Odhlásit se</a>
    `);
});


app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
