require("dotenv").config();
const dbConnection = require("../db");
const Console = require("../../models/consoles");
const consoles = require("./consoles");
const Games = require("../../models/games");
const games = require("./games");


//Pobla la BBDD con las seeds de games y consoles

const seedDB = async () => {

  try {
    //para limpiar las consolas
    await Console.deleteMany({})
    console.log('se eliminaron las consolas')
    //para poblar la base de consolas
    await Console.insertMany(consoles)
    console.log('se sembraron las consolas')

    //para limpiar los juegos
    await Games.deleteMany({})
    console.log('se eliminaron los juegos')
    //para poblar los juegos
    await Games.insertMany(games);
    console.log("se sembraron los juegos");
  } catch (error) {
    console.error(`no se pudo sembrar , error: ${error.message}`);
  }
};
dbConnection()
seedDB()

module.exports = seedDB;
