const Entry = require("./entry");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
    },
    entries: [
        {
            type: Schema.Types.ObjectId,
            ref: "Entry"
        }
    ]
});

module.exports = mongoose.model("Sensor", sensorSchema);