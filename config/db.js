const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB připojeno úspěšně...");
    } catch (err) {
        console.error("Chyba připojení k databázi:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;