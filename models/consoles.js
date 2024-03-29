const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
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
