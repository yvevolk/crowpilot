const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    photo_id: {
      type: Number,
      required: true,
    }
})

module.exports = mongoose.model('Photo', photoSchema);
