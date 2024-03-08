const Games = require("../models/games");

const getAllGames = async (req, res) => {
    const games = await Games.find()
    res.status(200).json({data: games})
}

const getGamesByID = async (req, res) => {
    const {id} = req.params
    const game = await Games.findById(id)
    res.status(200).json({data: game})
}

const addGame = async (req, res) => {
    const {title, console, genre, price} = req.body
    const newGame = new Games({
        title,
        console,
        genre,
        price
    })
    await newGame.save()
    res.status(201).json({data: newGame})
}

const updateGame = async (req, res) => {
    const {id} = req.params
}

module.exports = {getAllGames, getGamesByID, addGame}