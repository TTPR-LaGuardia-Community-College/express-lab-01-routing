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
  // Return JSON: { status: "ok" }
  res.json({ status: "ok"});
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
    const {id} = req.params;// this will return a STRING id!!!!
    const numberId = parseInt(id);
    //console.log(numberId);

    const userFound = users.find(item => item.id === numberId);
    //console.log(typeof(userFound));

  if(userFound !== undefined){
    res.json(userFound);
  }
  else{
    res.status(404).json({status: "User not found"});
  }
  // 3. Return user or 404 if not found


});

// TASK 3: Message Submission
app.post("/messages", (req, res) => {  //set the postman to POST function, and you need to provide message manually
  // 1. Get text from req.body
  // 2. Validate text exists
  // 3. Return JSON with:
  //    - Generated ID (number)
  //    - Original text
  //    - status: "received"

  const {text} = req.body;
  console.log(text)
  if(text){
    const result = {
      id: Math.floor(Math.random() * 101),
      message: text,
      status: "received"
    }

    res.send(result);
  }
  else{
    res.status(404).json({status: "There is no text"});
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
