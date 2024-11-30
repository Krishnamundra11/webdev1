const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Initialize Express App
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Serve Static Files
app.use(express.static("D:/WEB/webdev_proj/Public/styles")); // Primary static files directory
app.use(express.static("D:/WEB/webdev_proj/Public/Assets")); // Primary static files director
app.use(express.static("D:/WEB/webdev_proj/Public/Scripts")); // Primary static files directory
app.use(express.static("D:/WEB/webdev_proj")); // Additional static files if needed

// Connect to Database
const connectDB = require("./WEBBACKEND/database/mongodb");
connectDB();

// Routes
const router = require("./WEBBACKEND/routes/router");
app.use("/api/v1", router);

// Test Route
app.get("/", (req, res) => {
    res.sendFile(path.join("D:/WEB/webdev_proj", "home.html"));
});

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}`));
