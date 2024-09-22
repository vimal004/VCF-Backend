const express = require("express");
const mongoose = require("mongoose");
const groupRouter = express.Router();
const NodeCache = require("node-cache");

const groupSchema = new mongoose.Schema({
  group: { type: String, required: true, unique: true },
  groupname: String,
  months: Number,
  startmonth: String,
});

const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  data: [
    {
      auctionDate: { type: String, default: "" },
      dueDate: { type: String, default: "" },
      remainingAmount: { type: String, default: "" },
      dueAmount: { type: String, default: "" },
      paidAmount: { type: String, default: "" },
      status: { type: String, default: "" },
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);
const cache = new NodeCache();


// Update a group by ID
// Update a group by its unique identifier
groupRouter.put("/", async (req, res) => {
  // Filter out empty, null, or undefined fields from the request body
  const updateData = Object.keys(req.body).reduce((acc, key) => {
    if (
      req.body[key] !== "" &&
      req.body[key] !== null &&
      req.body[key] !== undefined
    ) {
      acc[key] = req.body[key];
    }
    return acc;
  }, {});

  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { group: req.body.group }, // Find by group identifier
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    res.status(200).json({
      message: "Group updated successfully",
      data: updatedGroup,
    });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(400).json({
      message: "Error updating group",
      error: error.message,
    });
  }
});

// Delete a group by ID
groupRouter.delete("/", async (req, res) => {
  const { group } = req.body; // Assuming req.body contains the group name to delete

  if (!group) {
    return res.status(400).json({ message: "Group is required" });
  }

  try {
    const deletedGroup = await Group.findOneAndDelete({ group });

    if (!deletedGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    res.status(200).json({
      message: "Group deleted successfully",
      data: deletedGroup,
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({
      message: "Error deleting group",
      error: error.message,
    });
  }
});

groupRouter.post("/", async (req, res) => {
  try {
    const result = await Group.create(req.body);
    res.status(201).json({
      message: "Group created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(400).json({
      message: "Error creating group",
      error: error.message,
    });
  }
});

groupRouter.post("/transaction", async (req, res) => {
  try {
    const result = await Transaction.create(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

groupRouter.get("/transaction", async (req, res) => {
  try {
    const { id } = req.query; // Use req.query to get the query parameter

    const result = await Transaction.findOne({ id: id });

    if (!result) {
      return res.status(404).send({ message: "Transaction not found" });
    }

    res.send({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

groupRouter.get("/", async (req, res) => {
  try {
    // Check if data is in cache
    const cacheKey = "groups";
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        message: "Groups retrieved from cache",
        data: cachedData,
      });
    }

    // Fetch from database if not in cache
    const groups = await Group.find();
    cache.set(cacheKey, groups); // Cache data for 10 minutes

    res.status(200).json({
      message: "Groups retrieved successfully",
      data: groups,
    });
  } catch (error) {
    console.error("Error retrieving groups:", error);
    res.status(500).json({
      message: "Error retrieving groups",
      error: error.message,
    });
  }
});

groupRouter.put("/transaction", async (req, res) => {
  try {
    const { id, data } = req.body;

    const result = await Transaction.findOneAndUpdate(
      { id: id },
      { data: data },
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).send({ message: "Transaction not found" });
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

groupRouter.delete("/transaction", async (req, res) => {
  try {
    const { id, data } = req.body;

    const result = await Transaction.findOneAndDelete({ id: id });

    if (!result) {
      return res.status(404).send({ message: "Transaction Deleted" });
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

groupRouter.get("/defaulters", async (req, res) => {
  try {
    // Retrieve transactions where at least one object in the data array has status "Defaulter"
    const defaulters = await Transaction.find({
      "data.status": "Defaulter",
    });

    res.send(defaulters);
  } catch (error) {
    console.error("Error fetching defaulters:", error);
    res.status(500).send("An error occurred while fetching defaulters.");
  }
});

module.exports = groupRouter;
