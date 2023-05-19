const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();
const pool = new Pool();
app.use(express.json());
app.use(cors());

//connecting to Elephant SQL

app.get("/", (req, res, next) => {
  res.send("Welcome to CookAI creators API");
  next();
});

// get all creators
app.get("/api/creators", (req, res) => {
  pool
    .query("SELECT * FROM creators;")
    .then((data) => res.json(data.rows))
    .catch((e) => res.status(500).send("ooopsi doopsi, something went wrong"));
});

// get single creator
app.get("/api/creators/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  pool
    .query("SELECT * FROM creators WHERE id=$1;", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.status(500).send("ooopsi doopsi, something went wrong"));
});

app.listen(PORT, console.log(`server connected at ${PORT}`));
