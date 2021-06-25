const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const Parking = mongoose.model('parking', ParkingSchema);
module.exports = Parking;