const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'Name is required.']
    },
    password: {
        type: String,
        validate: {
            validator: (password) => password.length > 2,
            message: 'Password must be at least three characters.'
        },
        required: [true, 'Password is required.']
    },
    admin: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },
    driversLicense: {
        type: Boolean,
        default: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    activeCar: {
        type: Boolean,
        default: false
    }
    //Maybe not needed
    // orders: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'order',
    //     required: true,
    // }]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;