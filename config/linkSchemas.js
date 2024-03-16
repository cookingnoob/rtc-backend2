const Console = require("../models/consoles");
const Games = require("../models/games");

const updateGamesWithConsoleId = async () => {
    try{
        const games = await Games.find()
        await Promise.all(
            games.map(async (game) => {
                const gameConsole = await Console.findOne({name: game.console})
                if(gameConsole){
                    game.console = gameConsole._id
                    await game.save()
                }
                console.log(game)
            })
        )
    }catch(error){
        console.log(error)
    }
}

module.exports = updateGamesWithConsoleId

