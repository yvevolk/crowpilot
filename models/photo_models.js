const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photo_id: {
      type: Number,
      required: true,
  },
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
    type: Number,
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
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Photo', photoSchema);