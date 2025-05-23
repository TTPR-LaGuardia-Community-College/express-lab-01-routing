const express = require("express");
const { status, json } = require("express/lib/response");
const app = express();
const PORT = 3000;

// Middleware: Enable JSON request body parsing
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Existing demonstration route (DO NOT MODIFY)
app.get("/", (req, res) => {
  res.send("Express Routing Lab - Home Page");
});

// 🎯 STUDENT TASKS: Add your routes below this line
// ------------------------------------------------

// Task 1: Health Check Endpoint
// CREATE GET /health
app.get("/health", (req, res) => {
  // Return JSON: { status: "ok" }
  res.status(200).json({ status: "ok"});
  // res.json({ status: ok}).status(200);
});

// TASK 2: User Routes
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  // Return all users
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  // 1. Get ID from req.params
  // 2. Find user in array
  // 3. Return user or 404 if not found
  const userId = Number(req.params.id);
  const user = users.find(element => element.id === userId) // return true or false
  // element => return {id === object info}

 // console.log('Does the user exist?', user)

  if(!user) {
     res.status(404).json({ error: "User not found" });
  }

  res.json(user).status(200);

});

// TASK 3: Message Submission
let nextMessageId = 1;
const messages = [];        // optional “DB”
app.post("/messages", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  const message = {
    id: nextMessageId++,
    text,
    status: "received",
  };

  messages.push(message);   // store it (not required, but handy)
  res.status(201).json(message);
});

// ------------------------------------------------
// END OF STUDENT TASKS

// 🚫 Do not modify below this line
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app };
