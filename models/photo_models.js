const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  photo_url: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  taken_by: {
    type: String,
    required: true,
  },
  photo_type: {
    type: String,
    required: true,
  },
  date_taken: {
    type: String,
    required: true,
  },
  flight_code: {
    type: String
  },
  flight_origin: {
    type: String,
    required: true,
  },
  flight_dest: {
    type: String,
    required: true,
  },
  remarks: {
    type: String
  },
  photo_id: {
    type: Number
  }
})

module.exports = mongoose.model('Photo', photoSchema);