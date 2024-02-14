require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = mongoose.connection;
const routes = require('./routes/routes')
mongoose.connect(process.env.DATABASE_URL)

const port = process.env.PORT || 9090;

app.listen(port, () => console.log(`Listening on ${port}...`));

app.use(express.json());

app.use('/api', routes)

app.use((err, req, res, next) => {
    console.log(err)
})

db.on('error', (err) => {console.log(err)})

module.exports = app;