const express = require('express')
const {getAllGames, getGamesByID, addGame} = require('../controller/games')

const router = express.Router()

router.get('/', getAllGames)

router.get('/:id', getGamesByID)

router.post('/new-game', addGame)

module.exports = router