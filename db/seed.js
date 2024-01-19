require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/users.js') //users schema!

const users = require('../db/data/test-data/users.json') // get user data to seed in

mongoose.connect(process.env.DATABASE_URL)
.then(() => {console.log('connected to mongodb')})
.catch((err) => console.log(err))

const seedDB = async () => {
    await User.deleteMany({})
    await User.insertMany(users)
}

seedDB().then(() => {
    console.log('database seeded')
    mongoose.connection.close();
})