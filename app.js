const express = require("express");
const gamesRouter = require("./routes/games");
const consolesRouter = require("./routes/consoles");
const dbConnection = require("./config/db");
const {updateGamesWithConsoleId, updateConsolesWithGames} = require("./config/linkSchemas");
const seedDB = require("./config/seeds/seedDB");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

dbConnection();
// seedDB()
// updateGamesWithConsoleId()
// updateConsolesWithGames()
app.use("/games", gamesRouter);

app.use("/consoles", consolesRouter);

app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const message = err.status === 404 ? err.message : "Internal server error";
  res.json({ message: message });
});

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`conectado al puerto ${PORT}`);
});
