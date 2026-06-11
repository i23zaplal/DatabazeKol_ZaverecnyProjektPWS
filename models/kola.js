const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Celoodpružené', 'Hardtail'], required: true },
    level: { type: String, enum: ['Základní', 'Střední', 'Nejlepší'], required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String }
});

module.exports = mongoose.model('Bike', bikeSchema);