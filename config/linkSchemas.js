const Console = require("../models/consoles");
const Games = require("../models/games");

//Usar una vez que este poblada la bbdd con las seeds

/**
 * Por cada juego en la lista, busca en la coleccion consoles la consola correspondiente
 * Cambia el campo console de el nombre en string por el id de la consola en console
 */
const updateGamesWithConsoleId = async () => {
    const games = await Games.find();
    await Promise.all(
      games.map(async (game) => {
        try{
          const gameConsole = await Console.findOne({ name: game.console });
          if(!gameConsole){
            console.error(`no existe la consola de ${game.title}`)
            return
          }else{
              game.console = gameConsole._id;
              await game.save();
          }
        }catch(error){
          console.error(`Error en actualizar el juego ${game.title}. Error ${error.message}`)
        }
      })
    );
    console.log('se actualizaron las consolas de los videojuegos')
};

/**
 * Actualiza el array de juegos en la consola
 * Cambia el valor de los titulos de los juegos por su id
 */
const updateConsolesWithGames = async () => {
    const consoles = await Console.find();
    for (const c of consoles) {
      try{
        const consoleGames = await Games.find({ console: c._id });
        const gamesIds = consoleGames.map((game) => game._id);
        c.games = gamesIds;
        await c.save();
      }catch(error){
        console.error(`No se pudo actualizar la consola ${c.name}. Error ${error.message}`)
      }
    }

};

module.exports = { updateGamesWithConsoleId, updateConsolesWithGames };
