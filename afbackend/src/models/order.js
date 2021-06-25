const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'car',
        required: true,
    },
    drivenKm: {
        type: Number,
        required: true
    },
    costs: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;