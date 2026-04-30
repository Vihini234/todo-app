// ✅ Check if file is running
console.log("SERVER FILE IS RUNNING 🚀");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // load .env

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Check MongoDB URI
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Check backend/.env");
  process.exit(1);
}

// ✅ Connect MongoDB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (err) {
    console.log("❌ MongoDB Connection Failed");
    console.log(err.message);
    process.exit(1);
  }
};

startServer();


// =========================
// 📦 TASK MODEL (Schema)
// =========================
const taskSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);


// =========================
// 🚀 ROUTES
// =========================

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ➕ CREATE task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      completed: false
    });

    await newTask.save();

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📋 GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✔️ UPDATE (toggle complete)
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

