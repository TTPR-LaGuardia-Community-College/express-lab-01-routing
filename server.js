const express = require("express");
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
  res.json({status:"ok"});
  // Return JSON: { status: "ok" }
});

// TASK 2: User Routes
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  res.json(users);
  // Return all users
});

app.get("/users/:id", (req, res) => {
  
  // 1. Get ID from req.param
  // 2. Find user in array
  // 3. Return user or 404 if not found
  const userID = parseInt(req.params.id);
  const user = users.find(u=> u.id == userID);
  if (user){
    res.json(user);
  }
  else{
    res.status(404).json({status:"Users not found!"});
  }


  
});

// TASK 3: Message Submission
app.post("/messages", (req, res) => {
  // 1. Get text from req.body
  // 2. Validate text exists
  // 3. Return JSON with:
  //    - Generated ID (number)
  //    - Original text
  //    - status: "received"
  const {text} = req.body;
  const num =(Math.floor(Math.random()*100)+1);
  if (text){
    const result ={
      id: num,
      message: text,
      status:"received"
    }
    res.send(result);
    
  }
  else{
    res.status(404).json({status: "Messages not found!"});
  
  }
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
