const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://krishnamundra118:bsjraTBxCcx9LP3u@studentcluster.ztfet.mongodb.net/?retryWrites=true&w=majority&appName=StudentCluster"
        );
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
