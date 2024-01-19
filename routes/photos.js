const express = require('express')
const router = express.Router();
const Photo = require('../models/photos.js')

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find()
        res.json(photos);
        console.log(photos)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})



module.exports = router