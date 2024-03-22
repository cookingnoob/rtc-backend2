const express = require("express");
const gamesRouter = require("./routes/games");
const consolesRouter = require("./routes/consoles");
const dbConnection = require("./config/db");
const {
  updateGamesWithConsoleId,
  updateConsolesWithGames,
} = require("./config/linkSchemas");
const seedDB = require("./config/seeds/seedDB");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

dbConnection();
//pobla la base de datos con las semillas
//Alternativamente puede limpiar la coleccion, pero esta comentada esa funcion
// seedDB()

//actualiza las consolas de los juegos con el id de la consola
// updateGamesWithConsoleId()

//actualiza el array de juegos en la consola con los ids de los juegos
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
