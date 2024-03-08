const express = require("express");
const dbConnection = require("./config/db");
const seedDB = require("./config/seeds/seedDB");
require('dotenv').config()

const app = express()
app.use(express.json())

dbConnection()
seedDB()
const PORT = 4001

app.listen(PORT, () => {
    console.log(`conectado al puerto ${PORT}`)
})