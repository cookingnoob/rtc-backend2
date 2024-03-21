const Console = require("../models/consoles");
const Games = require("../models/games");

const getAllConsoles = async (req, res, next) => {
  try {
    const consoles = await Console.find();
    res.status(200).json({ data: consoles });
  } catch (error) {
    next(error);
  }
};

const getConsoleByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const console = await Console.findById(id);
    res.status(200).json({ data: console });
  } catch (err) {
    next(err);
  }
};

const getConsoleWithGames = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consoleWithGames = await Console.findById(id).populate('games', 'title');
    res.status(200).json({ data: consoleWithGames });
  } catch (error) {
    next(error)
  }
}

const newConsole = async (req, res, next) => {
  const { name, company, games, price } = req.body;
  try {
    const addConsole = new Console({
      name,
      company,
      games,
      price,
    });
    await addConsole.save();
    res.status(201).json({ data: addConsole });
  } catch (error) {
    next(error);
  }
};

const editConsole = async (req, res, next) => {
  const { id } = req.params;
  const { name, company, games, price } = req.body;
  try {
    const modifiedGame = await Console.findByIdAndUpdate(
      id,
      { name, company, games, price },
      { new: true, runValidators: true }
    );
    res.status(200).json({ data: modifiedGame });
  } catch (err) {
    next(err);
  }
};

const editGameList = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {gameName, genre, price, deleteGame} = req.body

    const gamingConsole = await Console.findById(id)

    if(!gamingConsole){
      const error = new Error('no encontramos la consola')
      error.status = 404
      return next(error)
    }

    const gameAlreadyInDB = await Games.findOne({title: gameName})

    if(deleteGame){
      gamingConsole.games.pull(gameAlreadyInDB)
      await gamingConsole.save()
      res.status(200).json({message: 'Se elimino el juego de la lista'})
      return
    } else if(gameAlreadyInDB){
      const error = new Error('este juego ya existe en el catalogo')
      error.status = 409
      next(error)
    }else {
      const newGame = await new Games({
        title: gameName,
        console: gamingConsole._id,
        genre,
        price
      })
      await newGame.save()
      gamingConsole.games.push(newGame._id)
      await gamingConsole.save()
      res.status(201).json({message: 'se agrego con exito el juego', data: newGame, gamingConsole})
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Console.findByIdAndDelete(id);
    res.status(200).json({ data: "se eliminó la consola" });
  } catch (err) {
    next(err);
  }
};

//put que permita modificar un juego

module.exports = {
  getAllConsoles,
  getConsoleByID,
  getConsoleWithGames,
  newConsole,
  editConsole,
  editGameList,
  deleteConsole,
};
