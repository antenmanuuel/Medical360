const Room = require("../models/Room"); 
const mongoose = require('mongoose');
const Equipment=require("../models/Equipment");
const Doctor = require("../models/Doctor");

function createRoom(req, res) {
  const { roomNumber, roomType, equipment, availabilityStatus } = req.body;

  // Convert and validate equipment IDs
  const equipmentIds = equipment.map(id => 
    mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null
  ).filter(id => id !== null);

  // Check for invalid equipment IDs
  if (equipmentIds.length !== equipment.length) {
    return res.status(400).json({ error: "Invalid equipment ID(s) provided." });
  }

  // Create and save the new room
  const newRoom = new Room({
    roomNumber,
    roomType,
    equipment: equipmentIds,
    availabilityStatus
  });

  newRoom.save()
    .then(room => {
      equipmentIds.forEach(equipmentId => {
        Equipment.findByIdAndUpdate(equipmentId, { $inc: { quantity: -1 } })
          .catch(error => {
            console.error("Error updating equipment quantity:", error);
          });
      });

      console.log("Room saved successfully", room);
      res.status(201).json(room);
    })
    .catch(error => {
      console.error("Error saving room:", error);
      res.status(400).json({ error: "Error saving room: " + error.message });
    });
}

async function updateRoom(req, res) {
  try {
    let id = req.params.id;
    const updateObject = { $set: req.body };

    const updatedRoom = await Room.findOneAndUpdate({ _id: id }, updateObject, {
      new: true,
    });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ room: updatedRoom, message: "Updated room" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find();
    res.status(200).json({rooms});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRoom(req, res) {
  try {
    const room = await Room.findById(req.params.id).populate("equipment");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({room});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteRoom(req, res) {
  try {
    const roomId=req.params.id;
    const room = await Room.findById(roomId).populate('equipment');
    if (!room) {
      console.log("am i returning from here");
      return res.status(404).json({ message: "Room not found" });
    }
    // Increment quantities of the associated equipment
    const equipmentUpdates = room.equipment.map(eq => {
      return Equipment.findByIdAndUpdate(eq._id, { $inc: { quantity: 1 } }, { new: true });
    });
    await Promise.all(equipmentUpdates);
   
    // Delete the room after updating equipment quantities
    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: "Deleted room" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const RoomController = {
  createRoom,
  updateRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
};

module.exports = RoomController;
