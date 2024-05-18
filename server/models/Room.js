const mongoose = require("mongoose");

// Define the room schema
const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
      unique: true,
    },
    roomType: {
      type: String,
      required: [true, "Room type is required"],
      trim: true,
    },
    equipment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      },
    ],
    availabilityStatus: {
      type: String,
      required: [true, "Availability status is required"],
      enum: ["Occupied", "Available"],
      default: "Available",
    },
  },
  { collection: "rooms" }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
