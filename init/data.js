const mongoose = require("mongoose");
const Expense = require("../models/Expense.js"); // Assuming you have an Expense model

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Budgetbuddy")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err));

const seedExpenses = [
    {
        title: "Groceries",
        amount: 75,
        category: "Food",
        date: new Date("2025-03-01"),
        description: "Bought vegetables, fruits, and dairy items."
    },
    {
        title: "Uber Ride",
        amount: 18,
        category: "Transport",
        date: new Date("2025-03-02"),
        description: "Cab ride to a friend's house."
    },
    {
        title: "Electricity Bill",
        amount: 140,
        category: "Bills",
        date: new Date("2025-03-05"),
        description: "Electricity bill for March."
    },
    {
        title: "Gym Membership",
        amount: 50,
        category: "Bills",
        date: new Date("2025-03-06"),
        description: "Monthly gym membership fee."
    },
    {
        title: "Dinner with Friends",
        amount: 60,
        category: "Food",
        date: new Date("2025-03-07"),
        description: "Dinner at a restaurant with friends."
    },
    {
        title: "New Running Shoes",
        amount: 90,
        category: "Shopping",
        date: new Date("2025-03-08"),
        description: "Bought a pair of Nike running shoes."
    },
    {
        title: "Spotify Subscription",
        amount: 10,
        category: "Bills",
        date: new Date("2025-03-09"),
        description: "Monthly premium subscription for Spotify."
    },
    {
        title: "Gas Refill",
        amount: 45,
        category: "Transport",
        date: new Date("2025-03-10"),
        description: "Filled up the car with gas."
    },
    {
        title: "Movie Ticket",
        amount: 12,
        category: "Entertainment",
        date: new Date("2025-03-11"),
        description: "Watched a movie at the cinema."
    },
    {
        title: "Mobile Recharge",
        amount: 20,
        category: "Bills",
        date: new Date("2025-03-12"),
        description: "Monthly mobile data and call recharge."
    },
    {
        title: "Amazon Purchase",
        amount: 35,
        category: "Shopping",
        date: new Date("2025-03-13"),
        description: "Bought a new phone case and earphones."
    },
    {
        title: "Lunch at Office",
        amount: 15,
        category: "Food",
        date: new Date("2025-03-14"),
        description: "Ordered lunch at work."
    },
    {
        title: "Public Transport",
        amount: 8,
        category: "Transport",
        date: new Date("2025-03-15"),
        description: "Used the subway to commute."
    },
    {
        title: "Online Course",
        amount: 100,
        category: "Education",
        date: new Date("2025-03-16"),
        description: "Paid for an online web development course."
    },
    {
        title: "Home Internet Bill",
        amount: 50,
        category: "Bills",
        date: new Date("2025-03-17"),
        description: "Monthly home internet service bill."
    },
    {
        title: "Coffee at Starbucks",
        amount: 6,
        category: "Food",
        date: new Date("2025-03-18"),
        description: "Bought a cappuccino at Starbucks."
    },
    {
        title: "Gift for Friend",
        amount: 40,
        category: "Shopping",
        date: new Date("2025-03-19"),
        description: "Bought a birthday gift for a friend."
    },
    {
        title: "Parking Fee",
        amount: 5,
        category: "Transport",
        date: new Date("2025-03-20"),
        description: "Paid for parking near work."
    },
    {
        title: "Netflix Subscription",
        amount: 15,
        category: "Bills",
        date: new Date("2025-03-21"),
        description: "Monthly Netflix premium subscription."
    },
    {
        title: "Book Purchase",
        amount: 25,
        category: "Education",
        date: new Date("2025-03-22"),
        description: "Bought a self-improvement book."
    }
];

// Function to insert data into MongoDB
const seedDB = async () => {
    await Expense.deleteMany({}); // Clears existing data
    await Expense.insertMany(seedExpenses);
    console.log("Seeded expenses successfully!");
};

// Run the seeding function
seedDB().then(() => {
    mongoose.connection.close(); // Close connection after inserting data
});
