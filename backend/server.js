console.log("SERVER FILE IS RUNNING 🚀");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // load .env file

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Check backend/.env");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Failed");
    console.log(err.message);
  });

// test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// example Todo schema (you will need this for your project)
const todoSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model("Todo", todoSchema);

// CREATE todo
app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});