const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO)
        console.log('conectado a la db')
    } catch (error) {
        console.log('error en conectarse a la db: ',error)
    }
}

module.exports = dbConnection