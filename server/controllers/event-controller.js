const Event = require("../models/Event");

async function getEvents(req, res) {
  try {
    const userId = req.params.id;
    const events = await Event.find({ user: userId });

    if (!events.length) {
      return res.status(200).json({ message: "No events found", events: [] }); 
    }

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message, events: [] }); 
  }
}

    
async function getEvent(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    console.log("Whats event",event);
    if (!event) {
        return res.status(404).json({
            message: "event not found"
        });
    }
    res.status(200).json({
        event
    });
  } catch (error) {
    res.status(500).json({
        message: error.message
    });
  }
}

async function createEvent(req, res) {
    try {
        const { userId,status, ...eventData } = req.body; 
        const newEvent = new Event({ ...eventData, user: userId,status: status || 'available', }); 
        console.log("here I am once again",newEvent);
        await newEvent.save();
      res.status(201).json({ message: "Event created", event: newEvent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
async function updateEvent(req, res) {
    try {
        const { eventId } = req.params;
        const { title, start, end, allDay, status } = req.body;
        console.log("Title in updated",title,start,end,allDay,status);
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({ message: "Invalid date format." });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {
                title,
                start: startDate,
                end: endDate,
                allDay,
                status,
            },
            { new: true }
        );
        console.log('Updated event:', updatedEvent);

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: error.message });
    }
}

  // Delete an event by ID
 async function deleteEvent (req, res) {
    try {
      const { eventId } = req.params;
      await Event.findByIdAndDelete(eventId);
      res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
const EventController = {
    getEvents,
    createEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
};
module.exports = EventController;

