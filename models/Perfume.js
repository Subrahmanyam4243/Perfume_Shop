// server/models/Perfume.js
const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    sizes: [{ type: String }],
    reviews: [
        {
            user: { type: String, required: true },
            comment: { type: String, required: true },
            rating: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model('Perfume', perfumeSchema,'Products');