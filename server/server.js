'use strict'

const express = require('express')
const app = express()
//........................................



app.use(express.static('public'))
//........................................
const mongoose = require('mongoose')
//........................................








// var database_local = 'mongodb://localhost:27017/database-04'
// var port_local = 3000

var port     = process.env.PORT
var database = process.env.MONGODB_URI

//....................................................................
mongoose.connect(database, (err, res) =>
{
	if (err) throw err
	console.log('')
	console.log('- Conectado a mongo')


	//server.listen(port, () => {console.log('- Ejecutando en 3000')})

	app.listen(port, () => {console.log('- Ejecutando en 3000')})


	

})
//....................................................................