const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

// connect to hotels db
mongoose.connect(mongoURL);

// db is connection object
const db = mongoose.connection;

// connection cases
db.on("connected", () => console.log("Connected to MongoDB server"));
db.on("error", (err) => console.log("MongoDB connection error: ", err));
db.on("disconnected", () => console.log("MongoDB disconnected "));

module.exports = db;
