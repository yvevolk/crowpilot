require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = mongoose.connection;
const photosRouter = require('./routes/photos')
const usersRouter = require('./routes/users')

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)

db.on('error', (err) => {console.log(err)})

app.listen(3000, () => console.log('Server started'))

app.use('/photos', photosRouter)

app.use('/users', usersRouter)

module.exports = app;