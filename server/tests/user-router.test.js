const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/User");

jest.mock("../models/User");

const app = express();
app.use(bodyParser.json());

const userRouter = require("../routes/user-router");
app.use("/users", userRouter);

describe("PUT /users/:id", () => {
  it("should update a user and return 200 status", async () => {
    const userId = "someuserid";  // Example user ID
    const updatedData = {
      phone_number: "9876543210"
    };

    User.findOneAndUpdate = jest.fn().mockResolvedValue({
      ...updatedData,
      name: "Jane Doe",
      email: "janedoe@example.com",
      isAdmin: false,
    });

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty("phone_number", "9876543210");
    expect(response.body).toHaveProperty("message", "Updated user");
  });
});

// describe("GET /users/:id", () => {
//   it("should retrieve a specific user and return 200 status", async () => {
//     const userId = "specificuserid";  // Example user ID
//     User.findById = jest.fn().mockResolvedValue({
//       name: "John Doe",
//       email: "johndoe@example.com",
//       isAdmin: false,
//     });

//     const response = await request(app)
//       .get(`/users/${userId}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.user).toHaveProperty("name", "John Doe");
//   });
// });

describe("POST /users", () => {
  it("should retrieve all users and return 200 status", async () => {
    User.find = jest.fn().mockResolvedValue([
      {
        name: "John Doe",
        email: "johndoe@example.com",
        isAdmin: false,
      },
      {
        name: "Jane Smith",
        email: "janesmith@example.com",
        isAdmin: false,
      }
    ]);

    const response = await request(app)
      .post("/users");  // Note: This should ideally be a GET route for semantic correctness.

    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(2);
    expect(response.body.users[0]).toHaveProperty("name", "John Doe");
  });
});

describe("DELETE /users/:id", () => {
  it("should delete a user and return 200 status", async () => {
    const userId = "deleteuserid";  // Example user ID
    User.findByIdAndDelete = jest.fn().mockResolvedValue({
      name: "John Doe"
    });

    const response = await request(app)
      .delete(`/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Deleted User");
  });
});
