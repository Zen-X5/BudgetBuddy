const User = require("../models/User");
const wrapAsync = require("../middlewares/wrapAsync");

// Register a new user
exports.registerUser = wrapAsync(async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("User registered successfully");
});

// Get all users
exports.getAllUsers = wrapAsync(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get a user by ID
exports.getUserById = wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});
