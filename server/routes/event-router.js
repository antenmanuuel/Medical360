const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event-controller");

router.post("/user/:id", EventController.getEvents);
router.post('/', EventController.createEvent); 

// PUT update an existing event by ID
router.put('/:eventId', EventController.updateEvent);

// DELETE an event by ID
router.delete('/:eventId', EventController.deleteEvent);

router.post('/:id', EventController.getEvent)

module.exports = router;



