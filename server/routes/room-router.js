const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room-controller'); 

// POST route to create a new room
router.post('/', RoomController.createRoom);

// PUT to update room data by id
router.put('/:id', RoomController.updateRoom);

// GET route to get all rooms
router.post('/all', RoomController.getAllRooms);

// GET route to get single room by id
router.post('/:id', RoomController.getRoom);

// DELETE route to delete a specific room by ID
router.delete('/:id', RoomController.deleteRoom);

module.exports = router;
