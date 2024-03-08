const express = require('express')
const {getAllGames, getGamesByID, addGame, updateGame, deleteGame} = require('../controller/games')

const router = express.Router()

router.get('/', getAllGames)

router.get('/:id', getGamesByID)

router.post('/add', addGame)

router.put('/update/:id', updateGame)

router.delete('/delete/:id', deleteGame)

module.exports = router