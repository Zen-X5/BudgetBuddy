const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    budget: Number,  // Monthly budget limit
    transactions: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Expense"
         }]
});

module.exports = mongoose.model("User", userSchema);
