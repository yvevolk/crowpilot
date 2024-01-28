require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user_models.js') 
const Photo = require('../models/photo_models.js')

const users = require('./data/dev-data/users.json')
const photos = require('./data/dev-data/photos.json')

mongoose.connect(process.env.DATABASE_URL)
.then(() => {})
.catch((err) => console.log(err))

const seedDB = async () => {
    await User.deleteMany({})
    await Photo.deleteMany({})
    await User.insertMany(users)
    await Photo.insertMany(photos)
}

seedDB().then(() => {
    mongoose.connection.close();
})
