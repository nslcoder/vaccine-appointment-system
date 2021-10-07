const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    appointment: {
        birthdate: {
            type: Date,
        },
        gender: {
            type: String,
        },
        mobile: {
            type: Number,
        },
        address: {
            type: String,
        },
        vaxstation: {
            type: String,
        },
        vaxdate: {
            type: Date,
        },
        medcond: {
            type: Schema.Types.Mixed
        },
        agreed: {
            type: Boolean,
        },
        apptID: {
            type: String,
        },
        appointName: {
            type: String,
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);