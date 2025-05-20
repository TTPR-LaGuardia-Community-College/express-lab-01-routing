# Express Lab 01 – Routing

This is a basic Express.js project to practice routing, input validation, and error handling.

## Requirements

- Node.js v18+  
- npm (comes with Node)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/sinemkilicdere/express-lab-01-routing.git
   cd express-lab-01-routing


npm install
npm run dev
| Method | Route        | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/health`    | Returns `{ "status": "ok" }`     |
| GET    | `/users`     | Returns a list of users          |
| GET    | `/users/:id` | Returns a specific user or 404   |
| POST   | `/messages`  | Creates a message or returns 400 |


# Express Lab 1: Routing Fundamentals

## 📋 Prereqs:

1. Install Node.js (if it's not already installed)

   - Download from [nodejs.org](nodejs.org)
   - Verify installation:

   ```bash
   node -v  # Should show v18.x or higher
   npm -v   # Should show 9.x or higher
   ```

2. Install [Postman](postman.com/downloads)

### Important Documentation

- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Postman Request](https://learning.postman.com/docs/sending-requests/create-requests/request-basics/)
- [Rest API Concepts](https://www.restapitutorial.com/introduction/httpmethods)
- [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

## 🛠️ Setup Instructions:

1. Fork Starter Code
2. Clone your Forked Repo Code
3. Install Dependencies:

   ```bash
   npm install
   ```

- What this does:
  - Installs Express framework
  - Sets up development tools (nodemon)

## 🚀 Running the Server

1. Development Mode (Auto-restart)

   ```bash
   npm run dev
   ```

   - You should see:

   ```bash
   > nodemon server.js
   [nodemon] starting `node server.js`
   Server running on http://localhost:3000
   ```

## 🎯 Lab Objectives

1. Implement basic Express routes
2. Handle route parameters
3. Create RESTful endpoints
4. Practice request validation
5. Implement proper error handling

## 📝 Lab Tasks

### Task 1: Health Check Endpoint

- Create GET /health endpoint
- Return JSON:
  ```json
  {
    "status": "ok"
  }
  ```

### Task 2: User Routes

1. GET /users
   - Return all users from the users array as JSON:
     ```json
     [
       {
         "id": 1,
         "name": "Alice"
       },
       {
         "id": 2,
         "name": "Bob"
       }
     ]
     ```
2. GET /users/:id

   - Return specific user by ID
     ```json
     {
       "id": 1,
       "name": "Alice"
     }
     ```
   - Return 404 with JSON error if not found:
     ```json
     { "error": "User not found" }
     ```

### Task 3: Message Submission

1. Accepts JSON with { text: string }
2. Validates text exists in request body
3. Returns 400 error if validation fails
4. Returns JSON response with:
   ```json
   {
     "id": "generated-id-number",
     "text": "original-text",
     "status": "received"
   }
   ```

## 🧪 Postman Testing Guide

Collection Setup

1. Open Postman
2. Create new collection: Express Routing Lab
3. Add these requests:
   - **GET** http://localhost:3000/health
   - **GET** http://localhost:3000/users
   - **GET** http://localhost:3000/users/1 (valid user)
   - **GET** http://localhost:3000/users/999 (invalid user)
   - **POST** http://localhost:3000/messages

## 🧪 Automated Testing with Jasmine

Watch Mode (Continuous Testing):

```bash
npm run test:watch
```

- Automatically re-runs tests when files change with every save
- In your terminal ensure that there are no test with an F (failing)
  - At the bottom it should say:
  ```bash
  7 specs, 0 failures # When all test specs pass
  ```
