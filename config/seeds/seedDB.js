const Console = require("../../models/consoles");
const consoles = require("./consoles");
const Games = require("../../models/games");
const games = require("./games");

const seedDB = async () => {
  try {
    // await Console.insertMany(consoles)
    // console.log('se sembraron las consolas')
    await Games.insertMany(games);
    console.log("se sembraron los juegos");
  } catch (error) {
    console.log("no se pudo sembrar", error);
  }
};

module.exports = seedDB;
