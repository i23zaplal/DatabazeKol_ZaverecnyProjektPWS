const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Celoodpružené', 'Hardtail'], required: true },
    level: { type: String, enum: ['Základní', 'Střední', 'Nejlepší'], required: true },
    description: { type: String, required: true },
    image: { type: String } // Sem budeme později ukládat název obrázku nahrávaného přes multer
});

module.exports = mongoose.model('Bike', bikeSchema);