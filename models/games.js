const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: String,
    console: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Console",
    },
    /**
     * nombre de la consola en la seed
     * se cambia despues para obtener el id de mongo
     * console: string
     */
    genre: String,
    price: Number,
  },
  {
    timestamps: true,
    model: "games",
  }
);

const Games = mongoose.model("Games", gameSchema);

module.exports = Games;
