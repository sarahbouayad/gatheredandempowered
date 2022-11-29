const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    extractedText: {
        type: String, 
        required: false, 
    }
})

module.exports = mongoose.model("Text", textSchema);
