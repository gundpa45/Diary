const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express();

// ✅ MIDDLEWARE (ORDER MATTERS)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/contact_no")
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("Error found:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  mobile_no: Number,
  color: String,
});

// Model
const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Create new user
app.post("/user", async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser); 
});

// Get all users
app.get("/user", async (req, res) => {
  const users = await User.find();
  res.json(users); 
});

// About
app.get("/about", (req, res) => {
  res.send("this page is made by vishnu rathod");
});

app.listen(8000, () => {
  console.log("app is running on port no 8000");
});
