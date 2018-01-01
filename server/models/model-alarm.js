
const mongoose = require('mongoose')


// ESQUEMA
//........................................................
const alarmSchema = new mongoose.Schema({
	hora:     Number,
	minutos : Number
})
module.exports = mongoose.model("ModelAlarm", alarmSchema)
//........................................................