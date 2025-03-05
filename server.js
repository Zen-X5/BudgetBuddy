//Requires
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

// Load environment variables
dotenv.config();

//Server Set-up
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
async function main() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connection to database successful...");
}
main().catch(err => console.log(err));

// Requiring Routes and using them
const expenseRoutes = require('./routers/expenseRoutes');
const userRoutes = require('./routers/userRoutes');

app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Finance bot listening');
});

// Start the server
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});
