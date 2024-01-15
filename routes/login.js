const express = require('express')
const router = express.Router();
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const authenticateToken = require("../middleware/auth")
dotenv.config();

router.post('/', async (req,res) => {
    try{
        const {username, password} = req.body
        if (username !== process.env.USER_USERNAME || password !== process.env.USER_PASSWORD) {
            res.status(400).json("Wrong username/password")
        }
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, {   
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
                
        res.json({ token });
    } catch (err) {
        console.error(err.message)
    }
})

router.get('/', authenticateToken, async (req,res) => {
        res.json({ message: 'Logged out successfully' });
})

router.get('/check', authenticateToken, async (req,res) => {
    res.json({ message: 'Loggedin' });
})

module.exports = router;