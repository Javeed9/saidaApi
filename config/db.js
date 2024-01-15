const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.log('Error connecting to Db', err.message)
    }
}

module.exports =  connectDb;