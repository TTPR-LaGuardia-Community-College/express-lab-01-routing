// spec/server.spec.js
const request = require("supertest");
const app = require("../server").app;

describe("Express Lab Routes", () => {
  describe("GET /health", () => {
    it("should return status ok", async () => {
      const res = await request(app).get("/health").expect(200);
      expect(res.body).toEqual({ status: "ok" });
    });
  });

  describe("User Routes", () => {
    describe("GET /users", () => {
      it("should return all users", async () => {
        const res = await request(app).get("/users").expect(200);

        expect(res.body).toEqual([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]);
      });
    });

    describe("GET /users/:id", () => {
      it("should return a specific user", async () => {
        const res = await request(app).get("/users/1").expect(200);

        expect(res.body).toEqual({ id: 1, name: "Alice" });
      });

      it("should return 404 for non-existent user", async () => {
        const res = await request(app).get("/users/999").expect(404);

        expect(res.body).toEqual({ error: "User not found" });
      });
    });
  });

  describe("POST /messages", () => {
    it("should create a new message", async () => {
      const res = await request(app)
        .post("/messages")
        .send({ text: "Hello World" })
        .expect(201);

      expect(res.body).toEqual({
        id: jasmine.any(Number),
        text: "Hello World",
        status: "received",
      });
    });

    it("should return 400 for missing text", async () => {
      const res = await request(app).post("/messages").send({}).expect(400);

      expect(res.body).toEqual({ error: "Text is required" });
    });
  });

  describe("404 Handling", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/unknown-route").expect(404);

      expect(res.body).toEqual({ error: "Route not found" });
    });
  });
});
