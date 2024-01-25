const express = require('express')
const router = express.Router();
const Photo = require('../models/photo_models.js')
const User = require('../models/user_models.js')

router.get('/photos', async (req, res) => {
    try{
        const photos = await Photo.find(req.query);
        res.status(200).json(photos)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/photos/:username', async (req, res) => {
    const name = req.params.username;
    try {
        const checkUser = await User.find({"username": `${name}`});
        if (checkUser.length === 1){
             try {
             const photos = await Photo.find({"taken_by": `${name}`});
               res.status(200);
               res.json(photos)
    }
    catch(err){res.status(500).json({message: err.message})}
        }
        else {
            res.status(404).json({message: 'No such user exists'})
        }
    }
    catch(err){
     {res.status(500).json({message: err.message})}
    }
})

router.get('/users/:username', async (req, res) => {
    const name = req.params.username;
    try {
        const users = await User.find({"username": `${name}`});
        if (users.length === 0 ){
            res.status(404);
            res.json('No such user found');
        }
        else {
        res.status(200).json(users)}
    }
    catch(err){
          {res.status(500).json({message: err.message})}
    }
})

router.post('/photos', async (req, res) => {
    const photo = new Photo(req.body)
    try {
        const newPhoto = await photo.save()
        res.status(201).json(newPhoto)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

router.all('/*', function (req, res) {
    res.status(404).send({message: 'Invalid endpoint'})
})



module.exports = router

