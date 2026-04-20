require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// get all items
app.get("/items", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM items");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});