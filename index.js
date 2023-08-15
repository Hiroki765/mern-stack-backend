const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));  // POSTリクエストの解析用
app.use(express.json());                        // POSTリクエストの解析用
const connectDB = require("./utils/database");


app.get("/", (req, res) => {
    return res.status(200).json("こんにちは");
});

// ITEM functions
// Create Item 
app.post("/item/create", (req,res) => {
    connectDB();
    return res.status(200).json("こんにちは");
});
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