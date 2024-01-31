const express = require('express')
const router = express.Router();
const Photo = require('../models/photo_models.js')
const User = require('../models/user_models.js')
const fs = require('fs')

router.get('/', async (req, res) => {
        await fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8', (err, data) => {
            if (err){
                res.status(500).json({message: err.message})
            }
            else {
                res.status(200).json(JSON.parse(data))
            }
        })
    }
)


router.get('/photos', async (req, res) => {
    try{
        const photos = await Photo.find(req.query).sort({"date_taken": "desc"});
        res.status(200).json(photos)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/photos/:username', async (req, res) => {
    const name = req.params.username;
    try {
        const checkUser = await User.findOne({"username": `${name}`});
        if (checkUser){
             try {
             const photos = await Photo.find({"taken_by": `${name}`}).sort({"date_taken": "desc"});
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
    const username = req.params.username;
    try {
        const user = await User.findOne({"username": `${username}`})
        if (user){res.status(200).json(user)}
        else {res.status(404).json({message: 'No such user exists'})}
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

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message: 'Bad request'})
    }
})

router.patch('/users/:username', async(req, res) => {
    const username = req.params.username;
    const toUpdate = req.body;
    try {
        const user = await User.findOneAndUpdate({'username': `${username}`}, toUpdate, {'new': true});
        res.status(200).json(user)
    }
    catch(err){
        res.status(404).json({message: 'No such user exists'})
    }
})

router.patch('/photos/:photo', async (req, res) => {
    const id = req.params.photo;
    const toUpdate = req.body;
    try {
        const photo = await Photo.findByIdAndUpdate(id, toUpdate, {'new': true});
        res.status(200).json(photo)
    }
    catch(err){
        res.status(404).json({message: 'No such photo exists'})
    }
})

router.delete('/photos/:photo', async (req, res) => {
    const id = req.params.photo;
    try {
        await Photo.findByIdAndDelete(id)
        res.status(204).json()
    }
    catch(err){
        res.status(404).json({message: 'No such photo exists'})
    }
})

router.all('/*', function (req, res) {
    res.status(404).send({message: 'Invalid endpoint'})
})


module.exports = router

