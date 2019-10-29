const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true,
        default: Date.now
    },

    value: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Entry", entrySchema);