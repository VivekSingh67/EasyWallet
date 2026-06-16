const mongoose = require("mongoose");

const withdrawnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["groceries", "bills", "entertainment", "transportation", "healthcare", "education", "personal", "travel", "food", "other"]
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("Withdrawn", withdrawnSchema); 