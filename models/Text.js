const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    
    formData: {
        type: String,
        required: true,
      },
    resultText: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Text", textSchema);
