const mongoose = require('mongoose')

const consoleSchema = new mongoose.Schema({
    name: String,
    company: String,
    games: [{
        type: String
    }],
    price: Number
})

const Console = mongoose.model('Console', consoleSchema)

module.exports = Console