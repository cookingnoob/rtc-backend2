require("dotenv").config();
const express = require("express");
const gamesRouter = require("./routes/games");
const consolesRouter = require("./routes/consoles");
const dbConnection = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

dbConnection();

app.use("/games", gamesRouter);

app.use("/consoles", consolesRouter);

app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err)

  if (err.status) {
    res.status(err.status).json({ error: err.message })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'Validacion fallida', error: err.message })
  } else if (err.code && err.code === 11000) {
    res.status(409).json({ error: 'Se duplica la informacion' })
  } else {
    res.status(500).json({ message: 'error interno del servidor' });
  }
});

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`conectado al puerto ${PORT}`);
});
