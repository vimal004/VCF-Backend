const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const NodeCache = require("node-cache"); // Import NodeCache
const customerRouter = require("./Customer");
const groupRouter = require("./Group");

const app = express();
 // Initialize cache

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/", customerRouter);
app.use("/group", groupRouter);

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://menakaewm:JJifPBcZSbfk6jBj@cluster0.4e69thq.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
