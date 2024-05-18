const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Room = require("../models/Room"); // Adjust the path as necessary
const roomRouter = require("../routes/room-router"); // Adjust the path to your room-router

// Mock the Room model
jest.mock("../models/Room");

// Setup Express app
const app = express();
app.use(bodyParser.json());
app.use("/rooms", roomRouter);

describe('POST /rooms', () => {
  it('should create a new room with valid equipment IDs', async () => {
    const validObjectId1 = new mongoose.Types.ObjectId();
    const validObjectId2 = new mongoose.Types.ObjectId();
    const mockRoomData = {
      roomNumber: "101",
      roomType: "ICU",
      equipment: [validObjectId1, validObjectId2],
      availabilityStatus: "Available"
    };

    Room.prototype.save = jest.fn().mockResolvedValue(mockRoomData);

    const response = await request(app)
      .post('/rooms')
      .send({
        roomNumber: "101",
        roomType: "ICU",
        equipment: [validObjectId1.toString(), validObjectId2.toString()],
        availabilityStatus: "Available"
      })
      .expect(201);

    expect(response.body).toEqual({
      roomNumber: "101",
      roomType: "ICU",
      equipment: [validObjectId1.toString(), validObjectId2.toString()],
      availabilityStatus: "Available"
    });
  });

  it('should return 400 status when invalid equipment IDs are provided', async () => {
    const response = await request(app)
      .post('/rooms')
      .send({
        roomNumber: "102",
        roomType: "General",
        equipment: ["invalid-id1", "invalid-id2"],
        availabilityStatus: "Available"
      })
      .expect(400);

    expect(response.body.error).toBe("Invalid equipment ID(s) provided.");
  });
});
