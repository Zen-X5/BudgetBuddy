// Requires
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const engine = require('ejs-mate');
const methodOverride = require("method-override");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const flash = require('express-flash');
const Expense = require("./models/Expense");
const TotalBalance = require("./models/TotalBalance");
const User = require("./models/User");

// Server Set-up
const app = express();
const port = 3000;

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const dbUrl = 'mongodb://127.0.0.1:27017/Budgetbuddy';
mongoose.connect(dbUrl)
    .then(() => console.log("Connected to database successfully..."))
    .catch(err => console.log(err));

// Session Configuration
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate())); // ✅ Uses email instead of username
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Middleware for Flash Messages & Current User
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error"); // For Passport authentication errors
    res.locals.currUser = req.user;
    next();
});

// Root Route - Show all expenses & balance
app.get('/', async (req, res) => {
    try {
        let totalBalance = await TotalBalance.findOne();
        let allexpenses = await Expense.find({});
        res.render("home", { totalBalance, allexpenses, user: req.user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading home page");
    }
});

// Set Initial Balance (POST Request)
app.post("/set-balance", async (req, res) => {
    const { amount } = req.body;
    try {
        let balanceRecord = await TotalBalance.findOne();
        if (balanceRecord) {
            balanceRecord.amount = amount;
        } else {
            balanceRecord = new TotalBalance({ amount });
        }
        await balanceRecord.save();
        req.flash("success_msg", "Balance updated!");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error setting balance");
    }
});

// Add Expense & Subtract from Balance
app.post("/expenses/add", async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;
        const newExpense = new Expense({ title, amount, category, date, description });
        await newExpense.save();

        let balance = await TotalBalance.findOne();
        if (!balance) balance = new TotalBalance({ amount: 0 });
        balance.amount -= amount;
        await balance.save();

        req.flash("success_msg", "Transaction history updated!");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding expense");
    }
});

// Render Add Expense Page
app.get("/expenses/add", (req, res) => {
    res.render("./expenses/addExpense.ejs");
});

// Delete Expense & Restore Amount
app.delete("/delete-expense/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).send("Expense not found");
        }
        console.log(`Deleted: ${deletedExpense}`);
        req.flash("success_msg", "Transaction history updated!");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting expense");
    }
});

// Register Route - GET
app.get("/user/register", (req, res) => {
    res.render("./users/register");
});

// Register Route - POST
app.post("/user/register", async (req, res, next) => {
    console.log("Register route hit", req.body);
    const { username, email, password } = req.body;
    if (!password) {
        req.flash("error_msg", "Password is required.");
        return res.redirect("/user/register");
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error_msg", "Email is already registered. Try logging in.");
            return res.redirect("/user/register");
        }
        const newUser = new User({ username, email });
        await User.register(newUser, password);

        req.login(newUser, (err) => {
            if (err) return next(err);
            req.flash("success_msg", "Welcome! Your account has been created.");
            res.redirect("/");
        });
    } catch (err) {
        console.error("Registration Error:", err);
        req.flash("error_msg", err.message);
        res.redirect("/user/register");
    }
});

// Login Route - GET
app.get("/user/login", (req, res) => {
    res.render("./users/login");
});

// Login Route - POST
app.post("/user/login", async (req, res, next) => {
    console.log("Login attempt with:", req.body.email, req.body.password);
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash("error_msg", "No account found with this email.");
        return res.redirect("/user/login");
    }

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next);
});

// Logout Route
app.get("/user/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success_msg", "You have logged out.");
        res.redirect("/user/login");
    });
});


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    req.flash("error_msg", "Something went wrong! Please try again.");
    res.status(500).redirect("/");
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}...`);
});
