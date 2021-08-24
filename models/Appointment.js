const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    vaxstation: {
        type: String,
        required: true
    },
    vaxdate: {
        type: String,
        required: true
    },
    medcond: {
        type: Schema.Types.Mixed
    },
    agreed: {
        type: String,
        required: true
    },
    apptID: {
        type: String,
        required: true
    },
    appointName: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);