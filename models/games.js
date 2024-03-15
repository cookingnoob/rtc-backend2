const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: String,
    console: {type: mongoose.Schema.Types.ObjectId, ref: 'Console'},
    genre: String,
    price: Number
})

const Games = mongoose.model('Games', gameSchema)

module.exports = Games