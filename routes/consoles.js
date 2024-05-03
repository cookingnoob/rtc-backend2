const express = require("express");
const {
  getAllConsoles,
  getConsoleByID,
  newConsole,
  editConsole,
  deleteConsole,
  getConsoleWithGames,
  editGameList,
} = require("../controller/consoles");
const { deleteGameConsole } = require("../controller/games");

const router = express.Router();

router.get("/", getAllConsoles);

router.get("/:id", getConsoleByID);

router.get("/:id/games", getConsoleWithGames)

router.post("/add", newConsole);

router.put("/edit/:id", editConsole);

router.put("/:id/update-games", editGameList)

router.delete("/delete/:id", deleteConsole);



router.use((req, res, next) => {
  const err = new Error("Console not found");
  err.status = 404;
  next(err);
});

module.exports = router;
