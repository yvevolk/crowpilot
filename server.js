require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = mongoose.connection;
const routes = require('./routes/routes')

app.use(express.json());

app.use('/api', routes)

mongoose.connect(process.env.DATABASE_URL)

app.listen(3000, () => console.log('Server started'))

db.once('connected', () => {
    console.log('Database connected');
})

db.on('error', (err) => {console.log(err)})

module.exports = app;