const Console = require("../models/consoles");
const Games = require("../models/games");

//GET trae todos los juegos en la db
const getAllGames = async (req, res, next) => {
  try {
    const games = await Games.find();
    res.status(200).json({ data: games });
  } catch (error) {
    next(error);
  }
};

//GET trae el juego que corresponde con el id de la busqueda
const getGamesByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await Games.findById(id);
    //manejo de error si no esta el juego en la db
    if (!game) {
      const error = new Error("no encontramos el juego que buscas");
      error.status = 404;
      return next(error);
    }
    //respuesta si encontro el juego
    res.status(200).json({ data: game });
  } catch (error) {
    next(error);
  }
};

//GET trae un juego por id y popula la informacion de la consola que le corresponde
const getGamesWithConsole = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await Games.findById(id).populate("console", "name company");
    //manejo de error si no esta el juego
    if (!game) {
      const error = new Error("no encontramos el juego que buscas");
      error.status = 404;
      return next(error);
    }
    //respuesta si lo encontro
    res.status(200).json({ data: game });
  } catch (error) {
    next(error);
  }
};
//POST agrega un juego a la db
const addGame = async (req, res, next) => {
  try {
    const { title, console, genre, price } = req.body;
    const newGame = new Games({
      title,
      console,
      genre,
      price,
    });
    await newGame.save();
    res.status(201).json({ data: newGame });
  } catch (error) {
    next(error);
  }
};

//PUT actualiza la informacion de un juego
const updateGame = async (req, res, next) => {
  const { id } = req.params;
  const { title, console, genre, price } = req.body;
  try {
    const updatedGame = await Games.findByIdAndUpdate(
      id,
      { title, console, genre, price },
      { new: true, runValidators: true }
    );
    //si no se encuentra el juego a actualizar se lanza un error
    if (!updatedGame) {
      const error = new Error("no se encontro el juego");
      error.status = 404;
      next(error);
    }
    //respuesta si se encontro el juego
    res.status(200).json({ data: updatedGame });
  } catch (error) {
    next(error);
  }
};

//PUT actualiza la informacion de la consola de un juego, ya sea agregar o eliminar
const updateGameConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { consoleName, delete: deleteConsole } = req.body;

    const game = await Games.findById(id);
    //manejo de error si no se encontro el juego
    if (!game) {
      const error = new Error("no encontramos el juego");
      error.status = 404;
      return next(error);
    }
    //se va a buscar la consola con el nombre-consoleName que se da en el body a la base de datos
    const consoleInDB = await Console.findOne({ name: consoleName });
    //si no existe esa consola en la db no se puede agregar una nueva
    if (!consoleInDB) {
      const error = new Error("no existe la consola que quieres agregar");
      error.status = 404;
      return next(error);
      //elimina el valor de la consola en el juego
    } else if (deleteConsole === true) {
      game.console = null;
      await game.save();
      res.status(200).json({ message: "se elimino la consola", data: game });
      //si el juego ya tiene enlazada la consola que se quiere agregar manda un aviso
    } else {
      if (game.console && game.console.equals(consoleInDB._id)) {
        res
          .status(200)
          .json({
            message: "la consola ya está asociada al juego",
            data: game,
          });
        //enlaza el id de la consola al videojuego
      } else {
        game.console = consoleInDB._id;
        await game.save();
        res
          .status(200)
          .json({ message: "se actualizó la consola del juego", data: game });
      }
    }
  } catch (error) {
    next(error);
  }
};
//Elimina juegos de la base de datos
const deleteGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedGame = await Games.deleteOne({ _id: id });
    //manejo si no existe el juego
    if (!deletedGame) {
      const error = new Error("no se encontro el juego que querias borrar");
      error.status = 404;
      next(error);
    }
    //respuesta si lo encontro y elimino
    res.status(200).json({ data: "Juego eliminado" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllGames,
  getGamesByID,
  addGame,
  updateGame,
  deleteGame,
  getGamesWithConsole,
  updateGameConsole,
};
