const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 500, // Default balance is 0
    }
});

const TotalBalance = mongoose.model("TotalBalance", balanceSchema);
module.exports = TotalBalance;
