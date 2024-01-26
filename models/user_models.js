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
    required: true
  },
  phone: {
    type: String
  },
  avatar_url: {
    type: String,
    default: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f",
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