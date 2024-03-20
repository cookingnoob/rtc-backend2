const express = require("express");
const {
  getAllConsoles,
  getConsoleByID,
  newConsole,
  editGames,
  deleteConsole,
  getConsoleWithGames,
} = require("../controller/consoles");

const router = express.Router();

router.get("/", getAllConsoles);

router.get("/:id", getConsoleByID);

router.get("/:id/games", getConsoleWithGames)

router.post("/add", newConsole);

router.put("/edit/:id", editGames);

router.delete("/delete/:id", deleteConsole);

router.use((req, res, next) => {
  const err = new Error("Console not found");
  err.status = 404;
  next(err);
});

//get que consiga la consola y los juegos relacionados
//put que permita modificar un juego

module.exports = router;
