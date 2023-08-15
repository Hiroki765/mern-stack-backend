const express = require("express");
const app = express();

app.get("/", (req, res) => {
    return res.status(200).json("こんにちは");
});

// ITEM functions
// Create Item 
// Read All Items
// Read Single Item
// Update Item
// Delete Item

// USER functions
// Register User
// Login User

app.listen(4998, () => {
    console.log("Listening on localhost port 4998.");
});