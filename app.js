const express = require("express");
const gamesRouter = require('./routes/games')
const dbConnection = require("./config/db");
require('dotenv').config()


const app = express()
app.use(express.json())

dbConnection()

app.use('/games', gamesRouter)


app.use('*', (req, res) => {
    res.status(404).json({data: 'Not found'})
})

app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({data: 'Internal server error'})
})

const PORT = 4001

app.listen(PORT, () => {
    console.log(`conectado al puerto ${PORT}`)
})