const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  avatar_url: {
    type: String
  },
  acc_created: {
    type: Date,
    default: Date.now
  },
  home_airport: {
    type: String,
    required: true,
  },
  photos_taken: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema);