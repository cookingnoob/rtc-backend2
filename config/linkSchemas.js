const Console = require("../models/consoles");
const Games = require("../models/games");

const main = async () => {
    const allConsoles = await Console.find()
    const allGames = await Games.find()



}

module.exports = main

//SOLUCION MONGOOSE
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// const storySchema = Schema({
//   author: { type: Schema.Types.ObjectId, ref: 'Person' },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });

// const Story = mongoose.model('Story', storySchema);
// const Person = mongoose.model('Person', personSchema);


//Por cada consola
    //Por cada juego
        //ver que el nombre del juego coincida con el juego y obtener ese id