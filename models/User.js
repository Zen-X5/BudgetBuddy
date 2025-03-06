const mongoose = require('mongoose');
const Expense = require('./Expense'); // Importing the Expense model
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId, // Reference to Expense model
    ref: 'Expense' // Reference to the Expense model
  }]
});
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const User = mongoose.model('User', userSchema);
module.exports = User;
