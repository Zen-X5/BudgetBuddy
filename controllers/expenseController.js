const Expense = require("../models/Expense");
const wrapAsync = require("../middlewares/wrapAsync");

// Add a new expense
exports.addExpense = wrapAsync(async (req, res) => {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).send("Expense added successfully");
});

// Get all expenses
exports.getAllExpenses = wrapAsync(async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

// Get expenses by user ID
exports.getExpensesByUser = wrapAsync(async (req, res) => {
    const expenses = await Expense.find({ user: req.params.userId });
    res.json(expenses);
});
