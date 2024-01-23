require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = mongoose.connection;
const routes = require('./routes/routes')
mongoose.connect(process.env.DATABASE_URL)

app.use(express.json());
app.use(cors());

app.use('/api', routes)

app.use((err, req, res, next) => {
    console.log(err)
})
// app.listen(3000, () => {
//     console.log('listening on port 3000')
// })

db.on('error', (err) => {console.log(err)})

module.exports = app;