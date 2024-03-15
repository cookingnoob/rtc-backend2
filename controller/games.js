const Games = require("../models/games");

const getAllGames = async (req, res) => {
    const games = await Games.find()
    res.status(200).json({data: games})
}

const getGamesByID = async (req, res, next) => {
    try {
        const {id} = req.params
        const game = await Games.findById(id)
        res.status(200).json({data: game})
    } catch (error) {
        next(error)
    }
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

const updateGame = async (req, res, next) => {
    const {id} = req.params;
    const {title, console, genre, price} = req.body
    try{
        const updatedGame = await Games.findByIdAndUpdate(
            id,
            {title, console, genre, price},
            {new: true, runValidators: true}
        )
        res.status(200).json({data: updatedGame})
    }catch(err) {
        next(err)
    }
}

const deleteGame = async (req, res, next) => {
    const {id} = req.params;
    try{
    await Games.deleteOne({_id: id})
    res.status(200).json({data: 'Juego eliminado'}) 
    }catch(err){
        next(err)
    }
}

module.exports = {getAllGames, getGamesByID, addGame, updateGame, deleteGame}