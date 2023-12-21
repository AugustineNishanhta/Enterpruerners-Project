const express = require('express');
const app = express.Router();

const Program = require('../models/programmeshema');
const Event = require('../models/Eventshema');
const Model = require('../models/modelschema');

// Logic to fetch the counts
const getSchemaCounts = async () => {
  try {
    const programCount = await Program.countDocuments();
    const eventCount = await Event.countDocuments();
    const modelCount = await Model.countDocuments();

    return {
      programCount: programCount,
      eventCount: eventCount,
      modelCount: modelCount
    };
  } catch (error) {
    throw new Error('Failed to fetch schema counts');
  }
};

app.get('/', async (req, res) => {
  try {
    const counts = await getSchemaCounts();
    const events = await Event.find({});

    res.render('countrender', {
      programCount: counts.programCount,
      eventCount: counts.eventCount,
      modelCount: counts.modelCount,
      events: events
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;