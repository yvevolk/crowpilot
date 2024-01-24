require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user_models.js') 
const Photo = require('../models/photo_models.js')

const users = require('./data/test-data/users.json')
const photos = require('./data/test-data/photos.json')

mongoose.connect(process.env.DATABASE_URL)
.then(() => {console.log('connected to mongodb')})
.catch((err) => console.log(err))

const seedDB = async () => {
    await User.deleteMany({})
    await User.insertMany(users)
    
    await Photo.deleteMany({})
    await Photo.insertMany(photos)
}

seedDB().then(() => {
    console.log('database seeded')
    mongoose.connection.close();
})