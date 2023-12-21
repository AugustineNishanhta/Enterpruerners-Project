const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  conductedBy: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  payment: {
    type: Number,
    
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
