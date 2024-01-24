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

router.get('/photos/:user_id', async (req, res) => {
    const id = req.params.user_id;
    try {
        const checkUser = await User.find({"user_id": `${id}`});
        if (checkUser.length === 1){
             try {
             const photos = await Photo.find({"taken_by": `${id}`});
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
        if(err.reason.code === 'ERR_ASSERTION'){res.status(400).json({message: 'Bad request'})}
         else {res.status(500).json({message: err.message})}
    }
})

router.get('/users/:user_id', async (req, res) => {
    const id = req.params.user_id;
    try {
        const users = await User.find({"user_id": `${id}`});
        if (users.length === 0 ){
            res.status(404);
            res.json('No such user found');
        }
        else {
        res.status(200).json(users)}
    }
    catch(err){
         if(err.reason.code === 'ERR_ASSERTION'){res.status(400).json({message: 'Bad request'})}
         else {res.status(500).json({message: err.message})}
    }
})

router.post('/photos', async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        new Photo(data);
        res.status(201).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

router.all('/*', function (req, res) {
    res.status(404).send({message: 'Invalid endpoint'})
})



module.exports = router

