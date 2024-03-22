const Console = require("../../models/consoles");
const consoles = require("./consoles");
const Games = require("../../models/games");
const games = require("./games");

//Pobla la BBDD con las seeds de games y consoles
const seedDB = async () => {
  try {
    //para limpiar las consolas
    //await Console.deleteMany({})

    //para poblar la base de consolas
    await Console.insertMany(consoles)
    console.log('se sembraron las consolas')

    //para limpiar los juegos
    // await Games.deleteMany({})

    //para poblar los juegos
    await Games.insertMany(games);
    console.log("se sembraron los juegos");
  } catch (error) {
    console.error(`no se pudo sembrar , error: ${error.message}`);
  }
};

module.exports = seedDB;
