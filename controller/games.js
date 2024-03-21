const Console = require("../models/consoles");
const Games = require("../models/games");

const getAllGames = async (req, res) => {
  const games = await Games.find();
  res.status(200).json({ data: games });
};

const getGamesByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await Games.findById(id);
    res.status(200).json({ data: game });
  } catch (error) {
    next(error);
  }
};

const getGamesWithConsole = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await Games.findById(id).populate('console', 'name company');
    console.log(game)
    res.status(200).json({ data: game });
  } catch (error) {
    next(error)
  }
}

const addGame = async (req, res) => {
  const { title, console, genre, price } = req.body;
  const newGame = new Games({
    title,
    console,
    genre,
    price,
  });
  await newGame.save();
  res.status(201).json({ data: newGame });
};

const updateGame = async (req, res, next) => {
  const { id } = req.params;
  const { title, console, genre, price } = req.body;
  try {
    const updatedGame = await Games.findByIdAndUpdate(
      id,
      { title, console, genre, price },
      { new: true, runValidators: true }
    );
    res.status(200).json({ data: updatedGame });
  } catch (err) {
    next(err);
  }
};

const updateGameConsole = async (req, res, next) => {
  try {
    const {id} = req.params
    const {consoleName, delete: deleteConsole} = req.body

    const game = await Games.findById(id)

    if(!game){
      const error = new Error('no encontramos el juego')
      error.status = 404
      return next(error)
    }

    if(deleteConsole === true){
      game.console = null
    } else {
      const console = await Console.findOne({name: consoleName})
      if(!console) {
        const error = new Error('no encontramos la consola')
        error.status = 404
        return next(error)
      }
      game.console = console._id
    }

    await game.save()
    res.status(200).json({message : 'se actualizo la informacion del videojuego', data: game})
  } catch (error) {
    next(error)
  }
}

const deleteGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Games.deleteOne({ _id: id });
    res.status(200).json({ data: "Juego eliminado" });
  } catch (err) {
    next(err);
  }
};

//un put que permita agregar/eliminar la consola

module.exports = { getAllGames, getGamesByID, addGame, updateGame, deleteGame, getGamesWithConsole, updateGameConsole };
