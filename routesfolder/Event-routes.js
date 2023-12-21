const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/Eventshema');
const Reservation = require('../models/Reservation');

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new event with image upload
router.post('/shedule-events', upload.single('image'), async (req, res) => {
    const { date, time, conductedBy, heading, payment } = req.body;
  
    const newEvent = new Event();
    newEvent.date = date;
    newEvent.time = time;
    newEvent.conductedBy = conductedBy;
    newEvent.heading = heading;
    newEvent.payment = payment;
    newEvent.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  
    try {
      const savedEvent = await newEvent.save();
      res.redirect('/eventssapi/getevents'); // Redirect to /viewevent route
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// Retrieve all events
router.get('/getevents', async (req, res) => {
    try {
      const events = await Event.find({});
      res.render('events-view', { events });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  
  router.get('/events/:id/to-edit', async (req, res) => {
    const eventId = req.params.id;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.render('events-edit', { event }); // Assuming you have an "edit-event.ejs" file for editing the event
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Update an event
router.post('/events/:id/', upload.single('image'), async (req, res) => {
  const eventId = req.params.id;
  const { date, time, conductedBy, heading, payment } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.date = date;
    event.time = time;
    event.conductedBy = conductedBy;
    event.heading = heading;
    event.payment = payment;

    if (req.file) {
      event.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }
    try {
      const updatedEvent = await event.save();
      res.redirect('/adminapi');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/events/to-delete/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    res.redirect('/adminapi');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/shedule_event.html'));
  });


  router.get('/toreserve/:id', async function(req, res) {
    const eventId = req.params.id;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.render('reserveseat', { event }); // Assuming you have an "reserveseat.ejs" file for reserving the seat
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

  router.post('/bookseat', async function(req, res) {
    const {eventId, eventHeading, eventDate , eventConductedBy, eventTime,eventPayment,reservationHolder,seatCount} = req.body;
    
    
      
      // Save reservation to the database
      try {const reservation = new Reservation({
        eventId,
        eventHeading,
        eventDate,
        eventConductedBy,
        eventTime,
        eventPayment,
        reservationHolder,
        seatCount

        
      });
       await reservation.save();
      
      res.redirect('/userlogin'); // Redirect to a confirmation page
    }
     catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
 
module.exports = router;
