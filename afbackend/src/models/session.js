const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: false
    },
    carId: {
        type: String,
        required: true
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
});

const Session = mongoose.model('session', SessionSchema);
module.exports = Session;