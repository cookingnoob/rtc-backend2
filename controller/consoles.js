const Console = require("../models/consoles");

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
    const consoleWithGames = await Console.findById(id).populate('games');
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

const editGames = async (req, res, next) => {
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

const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Console.findByIdAndDelete(id);
    res.status(200).json({ data: "se eliminó la consola" });
  } catch (err) {
    next(err);
  }
};
//get que consiga la consola y los juegos relacionados
//put que permita modificar un juego

module.exports = {
  getAllConsoles,
  getConsoleByID,
  getConsoleWithGames,
  newConsole,
  editGames,
  deleteConsole,
};
