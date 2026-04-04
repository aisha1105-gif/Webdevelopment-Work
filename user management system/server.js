const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server start
app.listen(3000, () => {
    console.log("Server running on port 3000");
});