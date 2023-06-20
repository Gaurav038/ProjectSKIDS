const express = require("express");
const router = express.Router()
const datas = require('../models/data')

// get all users data
router.get('/', async(req, res) => {
    try {
        const data = await datas.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// create users data
router.post('/', async(req, res) => {
    const data = new datas({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
    })
    try {
        const a1 = await data.save()
        res.status(200).json(a1)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a user by id
router.get('/:id', async(req, res) => {
    try{
        const user = await datas.findById(req.params.id);
        res.status(200).json(user);
    }catch( error ){
        res.status(500).json({ message: error.message })
    }
})


// Update users data
router.patch('/:id', async(req, res) => {
    try {

        const updates = req.body;
        const options = {new:true}
        const rslt = await datas.findByIdAndUpdate(req.params.id, updates, options)
        
        res.status(200).json(rslt)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete users data
router.delete('/:id', async(req, res) => {
    try {
        const rslt = await datas.findByIdAndDelete(req.params.id)
        
        res.status(200).json(rslt)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;