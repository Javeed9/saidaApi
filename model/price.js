const { default: mongoose } = require("mongoose")

const priceSchema = new mongoose.Schema({
    gold : {type: Number, required: true},
    silver : {type: Number, required: true},
    updatedAt : {type: Date, default: Date.now}
})

const price = mongoose.model('price',priceSchema);
module.exports = price;