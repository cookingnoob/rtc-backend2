const express = require('express')
const { getAllConsoles, getConsoleByID, newConsole, editGames, deleteConsole } = require('../controller/consoles')

const router = express.Router()

router.get('/', getAllConsoles)

router.get('/:id', getConsoleByID)

router.post('/add', newConsole)

router.put('/edit/:id', editGames)

router.delete('/delete/:id', deleteConsole)

router.use((req,res,next) => {
    const err = new Error('Console not found')
    err.status = 404
    next(err)
})

module.exports = router