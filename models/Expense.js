const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ["Food", "Transport", "Bills","Entertainment","Education", "Shopping", "Other"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true
    }
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
