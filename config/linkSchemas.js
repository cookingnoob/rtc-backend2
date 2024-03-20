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

const updateConsolesWithGames = async () => {
    try{
        const consoles = await Console.find()

        for (const c of consoles){
            const consoleGames = await Games.find({console : c._id})
            const gamesIds = consoleGames.map(game => game._id)

            c.games = gamesIds

            await c.save()
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {updateGamesWithConsoleId, updateConsolesWithGames}

