const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");
require("dotenv").config();

app.use(cors());
app.use(express.json()); // Allows JSON data to be parsed

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Example route to get data from PostgreSQL
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM items");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
