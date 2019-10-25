const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    mountDate: {
        type: Date,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Sensor", sensorSchema);