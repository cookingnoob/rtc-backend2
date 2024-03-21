const express = require("express");
const {
  getAllGames,
  getGamesByID,
  addGame,
  updateGame,
  deleteGame,
  getGamesWithConsole,
  updateGameConsole,
} = require("../controller/games");

const router = express.Router();

router.get("/", getAllGames);

router.get("/:id", getGamesByID);

router.get("/:id/console", getGamesWithConsole)

router.post("/add", addGame);

router.put("/update/:id", updateGame);

router.put("/:id/update-console", updateGameConsole)

router.delete("/delete/:id", deleteGame);

router.use((req, res, next) => {
  const err = new Error("Game not found");
  err.status = 404;
  next(err);
});


//un put que permita agregar/eliminar la consola

module.exports = router;
