const express = require("express");
const {text} = require("express");
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
    const statue = {
        status: "ok",
    }
    res.send(statue);
});

// TASK 2: User Routes
const users = [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"},
];

app.get("/users", (req, res) => {
    // Return all users
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    // 1. Get ID from req.params
    // 2. Find user in array
    // 3. Return user or 404 if not found
    const userId = parseInt(req.params.id);

    const user = users.find((user) => user.id === userId);
    if (!user) {
        res.status(404).json({
            error: "User not found",
        });
    }
    res.json(user);
});

// TASK 3: Message Submission
app.post("/messages", (req, res) => {
    // 1. Get text from req.body
    // 2. Validate text exists
    // 3. Return JSON with:
    //    - Generated ID (number)
    //    - Original text
    //    - status: "received"
    let message = {}
    try {
         message = req.body.text;
    }  catch (e) {
        return res.status(400).json({
            error: "Text is required"
        });
    }  // if (
    //     !(typeof {message} === "string") || !("text" in message)
    // ) {
    //     return res.status(400).json({error: 'Text is required'});
    // }
    if (typeof message !== "string" || message.trim() === "") {
        return res.status(400).json({
            error: "Text is required"
        });
    }


    const response = {
        'id': Date.now(),
        'text': message,
        'status': 'received'
    }

    return res.status(201).json(response);

});

// ------------------------------------------------
// END OF STUDENT TASKS

// 🚫 Do not modify below this line
app.use((req, res) => {
    res.status(404).json({error: "Route not found"});
});

app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({error: "Internal server error"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = {app};
