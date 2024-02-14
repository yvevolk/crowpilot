require('dotenv').config()
const mongoose = require('mongoose')
const db = mongoose.connection;

const users = require('./data/dev-data/users.json')
const photos = require('./data/dev-data/photos.json')

mongoose.connect(process.env.DATABASE_URL)
.then(() => {})
.catch((err) => console.log(err))

const seedDB = async () => {
    await db.collection('users').deleteMany({});
    await db.collection('photos').deleteMany({});
    await db.collection('counters').deleteMany({});
    await db.collection('users').insertMany(users);
    await db.collection('photos').insertMany(photos);
}

seedDB().then(() => {
    mongoose.connection.close();
})