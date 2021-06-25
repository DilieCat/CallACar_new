const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    class: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    drivenKm: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Car = mongoose.model('car', CarSchema);
module.exports = Car;