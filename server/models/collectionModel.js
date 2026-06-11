import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
    },
    category: {
        type: String,
        enum: ["groceries", "bills", "entertainment", "transportation", "healthcare", "education", "personal", "travel", "food","other"]
    },
    date: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});


export default mongoose.model("Collection", collectionSchema);