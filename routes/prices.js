const express = require('express')
const router = express.Router();
const priceModel = require('../model/price');
const dotenv = require("dotenv")
const authenticateToken = require("../middleware/auth")
dotenv.config();

router.post('/', authenticateToken, async (req,res) => {
    try {
        const existingPrice = await priceModel.findOne({});

        if (existingPrice) {
            if (req.body.gold) existingPrice.gold = req.body.gold;
            if (req.body.silver) existingPrice.silver = req.body.silver;
            await existingPrice.save();
            res.status(200).json(existingPrice);
        } else {
            const price = new priceModel(req.body);
            await price.save();
            res.status(201).json(price);
        }
    } catch (err) {
        console.error(err.message)
    }
})

router.get('/', async (req,res) => {
    try {
        const price = await priceModel.find();
        res.json(price)
    } catch (err) {
        res.status(500).send("server error");
    }
})
module.exports = router;