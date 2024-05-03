const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    company: String,
    gamesNames: [{ type: String }],
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Games",
      },
    ],
    price: Number,
  },
  {
    timestamps: true,
    model: "consoles",
  }
);

const Console = mongoose.model("Console", consoleSchema);

module.exports = Console;
