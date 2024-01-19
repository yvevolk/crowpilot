const express = require('express')
const router = express.Router();
const User = require('../models/users.js')

router.get('/', async (req, res) => {
    try {
        const users = await User.find({},{'_id': false, 'user_id': true, 'firstname': true, 'surname': true}).sort({'user_id': 1})
        res.json(users);
        console.log(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})



module.exports = router