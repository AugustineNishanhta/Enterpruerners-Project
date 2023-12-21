const mongoose = require('mongoose');
const Eventschema = require ('./Eventshema')


const reservationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Eventschema',
        required: true
      },
  
  eventHeading: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventConductedBy: {
    type: String,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  eventPayment: {
    type: Number,
    required: true
  },
  reservationHolder: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  seatCount: {
    type: Number,
    required: true
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
