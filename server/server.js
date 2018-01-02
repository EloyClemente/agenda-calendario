'use strict'

const express = require('express')
const app = express()
//........................................
const server = require('http').Server(app)
//........................................
const io = require('socket.io')(server)
//........................................
app.use(express.static('public'))
//........................................
const mongoose = require('mongoose')
//........................................


// Importar Models
//..............................................
var ModelEvent = require('./models/model-event')
var ModelAlarm = require('./models/model-alarm')
//..............................................



io.on('connection', (socket) =>
{
	//...................................................................................
	console.log( socket.handshake.address + '- Alguien se ha conectado'); console.log('')
	//...................................................................................


	ModelEvent.find((err, todo) =>
	{
		// Para marcar los días con evento
		//................................
		socket.emit('marcar', todo)
		//................................


		// La variable eventos contiene todos los eventos en forma de objeto
		//...................................................................
		todo.map((eventos) =>
		{
			// Emitimos los objetos eventos
			//...................................
			socket.emit('datosEnviados', eventos)
		})
		//...................................................................
	})
	




	// POST DEL FORMULARIO
	//........................................................
	socket.on('datosDevueltos', function(objetoDesdeElCliente)
	{
		// Modelo
		//......................................
		var modelEvent = new ModelEvent()
		modelEvent.fecha  = objetoDesdeElCliente.fecha
		modelEvent.hora   = objetoDesdeElCliente.hora
		modelEvent.evento = objetoDesdeElCliente.evento
		modelEvent.save()
		//......................................
		
		io.sockets.emit('datosEnviados', modelEvent)
	})




	// BORRAR EVENTO
	// Emitido desde delete-buttons-action.js
	//......................................................
	socket.on('borrarEvento', function( id_evento_a_borrar )
	{
		// Borramos el evento con findOneAndRemove()
		//.............................................................................
		ModelEvent.findOneAndRemove({"_id":`${ id_evento_a_borrar }`}, (err, parametros) => 
		{
			ModelEvent.find((err, todo) =>
			{	
				socket.emit('marcar', todo)
			})
		})
	})









	// FILTRAR POR FECHA
	// Emitido desde client.js
	//.....................................................
	socket.on('mostrar', function( fecha )
	{
		ModelEvent.find({"fecha":`${ fecha }`}, (err, parametros) =>
		{
			parametros.map((fechas) =>
			{
				io.sockets.emit('datosEnviados', fechas)
			})
		})
	})






	// BOTON MOSTRAR TODOS
	// Emitido desde client.js
	//...........................
	socket.on('todos', function()
	{
		ModelEvent.find((err, todos) =>
		{
			todos.map((allEvents) =>
			{
				socket.emit('datosEnviados', allEvents)
			})
		})
	})




	// MARCAR DÍAS EN CADA POST
	//..............................
	socket.on('posteado', function()
	{
		ModelEvent.find((err, todo) =>
		{
			socket.emit('marcar', todo)
		})
	})





	

	// SAVE NEW ALARM
	// Recoge la hora escrita en la alarma
	// la guarda y la emite al cliente
	//.............................................
	socket.on('setAlarm', (setAlarm) =>
	{
		var modelAlarm = new ModelAlarm()

		modelAlarm.hora    = setAlarm.hora
		modelAlarm.minutos = setAlarm.minutos
		modelAlarm.save()
	})
	



	//::::::::::::::::::::::::::::::::::::::::::::::
	// MOSTRAR ALARMAS AL GUARDAR UNA NUEVA
	// Al insertar una nueva alarma emite todas
	//..............................................
	socket.on('mostrarAlarmasGuardadas', function()
	{
		ModelAlarm.find((err, todo) =>
		{
			// El parametro publicar es para que se 
			// modifiquen las medidas del panel sólo cuando 
			// publique una alarma, no al refrescar el navegador
			socket.emit('showAlarms', todo, "publicar")
		})
	})

	// MOSTRAR ALARMAS AL REFRESCAR
	// Al refrescar emite todas las alarmas guardadas
	//...............................................
	ModelAlarm.find((err, todo) =>
	{
		socket.emit('showAlarms', todo)
	})
	//::::::::::::::::::::::::::::::::::::::::::::::::
	



	// Llamada por el timer
	//.....................
	socket.on('timerCalls', function()
	{
		ModelAlarm.find((err, todo) =>
		{
			socket.emit('revisarAlarmas', todo)
		})
	})
		
	
	



	// Borrar alarma
	//...............................
	socket.on('deleteAlarm', (id) =>
	{
		// Borramos por el id recibido
		//......................................................................
		ModelAlarm.findOneAndRemove({ "_id" : `${ id }`}, (err, parametros) => {

			ModelAlarm.find((err, todo) =>
			{
				socket.emit('alarmasRestantes', todo)
			})
		})
	})





}) // io.on('connection')











// var port = 3000
// var database = 'mongodb://localhost:27017/database-04'

var port     = process.env.PORT
var database = process.env.MONGODB_URI

//....................................................................
mongoose.connect(database, (err, res) =>
{
	if (err) throw err
	console.log('')
	console.log('- Conectado a mongo')

	server.listen(port, () => {console.log('- Ejecutando en 3000')})
})
//....................................................................