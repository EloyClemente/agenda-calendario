'use strict'

var container_entradas = document.getElementById('container_entradas')
var alarm_input_hora = document.getElementById('alarm_input_hora')

// IMPORTANTE: ESTE ARCHIVO HA DE ESTAR EN LA CARPETA 
// DETECTADA POR app.use(express.static('public'))
// (EN ESTE CASO PUBLIC), YA QUE SI NO ME DARÁ ESOS
// DOS DESESPERANTES ERRORES DE SIEMPRE EN LA CONSOLA.
// ENLAZA CON INDEX.HTML

var socket = io.connect('https://agenda-calendario.herokuapp.com', { 'forceNew': true })


// Recibe los eventos
// y llama a la función render()
//..........................................
socket.on('datosEnviados', function(eventos)
{
	render(eventos)
})

function render(eventos)
{
	// Llama a render.js
	// para insertar los datos en el DOM
	//...................................
	insertar(eventos)


	// Llama a la función que 
	// asignará a los botones
	// de borrar su acción
	//...................
	deleteButtonsAction()
}
//............................................











// Hacemos el submit desde aquí
//....................................................
var formulario = document.getElementById('form')
formulario.addEventListener('submit', addMessage)
//....................................................

function addMessage(e)
{
	e.preventDefault()

	var mensajeFormulario = {
		fecha:  document.getElementById('hidden_post_fecha').value,
		hora:   document.getElementById('input_post_hora').value,
		evento: document.getElementById('input_post_evento').value
	}

	socket.emit('datosDevueltos', mensajeFormulario)

	document.getElementById('input_post_hora').value = ""
	document.getElementById('input_post_evento').value = ""




	// Para marcar el nuevo día con evento
	//....................................
	socket.emit('posteado')
}





// FILTRAR POR FECHA
// Muestra los eventos de la capa clicada
//........................................
function filtrar_por_fecha()
{
	container_entradas.innerHTML = ""

	//............................
	let ano = this.dataset.ano
	let mes = this.dataset.mesnum
	let dia = this.dataset.dia

	let fecha = ano + mes + dia
	//............................


	socket.emit('mostrar', fecha)
}
//........................................



// MOSTRAR TODOS
// Es llamada desde el DOM con el botón "mostrar todos"
//..........................................................
var mostrar_todos = document.getElementById('mostrar_todos')
mostrar_todos.addEventListener('click', todos)

function todos()
{
	container_entradas.innerHTML = ""
	socket.emit('todos')
}
//..........................................................







// Recibimos las fechas emitidas
// para marcar los días con evento
//........................................
socket.on('marcar', function(datos)
{
	// Borrar color de fondo
	//...........................................................
	var capasNumeros = document.getElementsByClassName('numeros')

	for(let i=0; i < capasNumeros.length; i++)
	{
		capasNumeros[i].style.backgroundColor = "transparent"
		capasNumeros[i].style.color = "#666"
	}
	//...........................................................



	datos.map(function(misDatos)
	{
		setTimeout(function()
		{
			// Marcar días con evento
			var marcar = document.getElementById(misDatos.fecha)	
			marcar.style.backgroundColor = "#FF79A0"
			marcar.style.color = "#fff"
		}, 50)
	})
})





//::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// SET ALARM
// Recoge la hora escrita en la alarma 
// y la emite al server en forma de json
// Para poder guardarla
// Llamada desde index.html
//........................................................
alarm_button_save.addEventListener('click', saveAlarm)

function saveAlarm()
{
	let setAlarm = {

		hora :    parseInt(alarm_input_hora.value),
		minutos : parseInt(alarm_input_minutos.value)
	}


	// Emitir objeto al server para guardarlo
	// si los campos de texto no están vacíos
	if(alarm_input_hora.value != "" && alarm_input_minutos.value != "")
	{
		socket.emit('setAlarm', setAlarm)
		socket.emit('mostrarAlarmasGuardadas')
	}
}



// GET ALARMS
// Recoge todas las alarmas guardadas que
// han sido emitidas por el server
//.............................................
socket.on('showAlarms', function(todo, parametro)
{
	// Si hay alarmas en la base de datos
	// que el timer comience a llamar
	// a cada segundo
	//...............
	if(todo == "")
	{
		alarm_status = false
		iconoBellOff()
	}
	else
	{
		alarm_status = true
		iconoBellOn()
	

		clearAlarmContainer() // Llama una sola vez a la función de limpiar capa

		todo.map(function(settings)
		{
			// Llama a la función que pintará las alarmas
			//............................................
			showAlarms(settings.hora, settings.minutos, settings._id, parametro)
		})
	}
})
//........................................................



// LLAMAR CADA SEGUNDO
// Llamada por el timer
// a cada segundo para 
// revisar las alarmas
//.....................
function timerCalls()
{
	console.log('llamada del timer')
	socket.emit('timerCalls')
}

// RECIBIR CADA SEGUNDO
// Recibe del server las alarmas guardadas
//.........................................
socket.on('revisarAlarmas', function(todo)
{
	todo.map(function(alarmas)
	{
		if(Tiempo.second() == 0)
		{
			alarm(alarmas.hora, alarmas.minutos)
		}		
	})	
})



//::::::::::::::::::::::::::::::::::::::::::::
// Alarma a borrar
//....................
function deleteAlarm(id)
{
	socket.emit('deleteAlarm', id)
}

// Para detener el timer
//..........................................
socket.on('alarmasRestantes', function(todo)
{
	// Si no hay alarmas
	if(todo == "")
	{
		alarm_status = false
		iconoBellOff()
	}

	// Detener el timer
	revisarAlarmas(alarm_status)
})
//::::::::::::::::::::::::::::::::::::::::::::