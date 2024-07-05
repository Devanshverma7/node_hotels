const express = require("express");
const app = express();
const Person = require("./models/person");
const menuItem = require("./models/menu");
const db = require("./db");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json()); // req.body

// Routes
app.get("/", (req, res) =>
  res.send("Welcome to our hotel")
);

const personRoutes = require("./routes/personRoutes");
app.use('/person',personRoutes);

// Start the server
app.listen(3000, () => console.log("Listening on port 3000"));
