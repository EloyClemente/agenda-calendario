
const mongoose = require('mongoose')

// ESQUEMA
//.......................................................
const eventSchema = new mongoose.Schema({
	fecha:  String,
	hora:   String,
	evento: String
})
module.exports = mongoose.model("ModelEvent", eventSchema)
//.......................................................