const express = require('express');
const dotenv = require('dotenv')
const connectDb = require("./config/db")
const cors = require('cors')

const app = express()
app.use(cors())

// app.use(cors({
//     origin: 'frontendUrl',
//     optionsSuccessStatus: 200
//   }));

const port = process.env.PORT || 3000
dotenv.config()
connectDb()

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const prices = require('./routes/prices')
app.use('/prices', prices)

const login = require('./routes/login')
app.use('/login', login)

const catalog = require('./routes/catalog')
app.use('/catalog', catalog)

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})