const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Routes
router.post("/add", expenseController.addExpense);
router.get("/", expenseController.getAllExpenses);
router.get("/user/:userId", expenseController.getExpensesByUser);

module.exports = router;
