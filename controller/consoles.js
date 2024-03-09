const Console = require("../models/consoles");

const getAllConsoles = async (req, res) => {
    const consoles = await Console.find()
    res.status(200).json({data: consoles})
}

const getConsoleByID = async (req, res) => {
    const {id} = req.params
    const console = await Console.findById(id)
    res.status(200).json({data: console})
}

const newConsole = async (req, res) => {
    const {name, company, games, price} = req.body
    const addConsole = new Console ({
        name,
        company,
        games,
        price
    })
    await addConsole.save()
    res.status(201).json({data: addConsole})
}

const editGames = async (req, res) => {
    const {id} = req.params
    const {name, company, games, price} = req.body
    const modifiedGame = await Console.findByIdAndUpdate(
        id,
        {name, company, games, price},
        {new: true, runValidators: true}
    )
    res.status(200).json({data: modifiedGame})
}

const deleteConsole = async (req, res) => {
    const {id} = req.params
    await Console.findByIdAndDelete(id)
    res.status(200).json({data: 'se eliminó la consola'})
}

module.exports = {getAllConsoles, getConsoleByID, newConsole, editGames, deleteConsole}