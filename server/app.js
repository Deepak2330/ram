const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// Load models
require("./models/model.js");
require("./models/post.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(require("./routes/auth.js"));
app.use(require("./routes/createPost.js"));
app.use(require("./routes/user.js"));

// MongoDB Connection
const mongoUrl = process.env.mongoUrl;

if (!mongoUrl) {
    console.error("❌ MongoDB connection string is missing. Check your .env file.");
    process.exit(1); // Exit the app if no DB URL
}

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Successfully connected to MongoDB");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
