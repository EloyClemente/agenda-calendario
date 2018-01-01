
var alarm_button         = document.getElementById('alarm_button')
var alarm_panel          = document.getElementById('alarm_panel')
var alarm_input_hora     = document.getElementById('alarm_input_hora')
var alarm_input_minutos  = document.getElementById('alarm_input_minutos')
var alarm_icon           = document.getElementById('alarm_icon')
var alarm_panel_bloque_1 = document.getElementById('alarm_panel_bloque_1')
var alarm_panel_bloque_3 = document.getElementById('alarm_panel_bloque_3')
var contador_hide_show   = false
var alarm_status
var parpadeo



// Tag de audio con la url del mp3
//............................................
var alarma = document.getElementById('alarma')
//............................................





// Llamada desde client.js
//........................
function alarm(hora, minutos)
{
	alarm_status = true

	if(Tiempo.hour()   == parseInt(hora)
	&& Tiempo.minute() == parseInt(minutos))
	{
		alarma.play()
		iconBlink()
	}
}



//**********************************************
// Pausar alarma
//..............................................
alarm_icon.addEventListener('click', alarmPause)
//..............................................

function alarmPause()
{
	alarma.pause()
	clearInputs()
	clearTimeout(parpadeo)
}
//**********************************************




// MOSTRAR / OCULTAR PANEL
//..............................................
alarm_button.addEventListener('click', function()
{
	show_hide_panel("boton_alarma")
})

function show_hide_panel(parametro)
{
	let capas_alarmas = alarm_panel_bloque_3.getElementsByClassName('alarm-container')
	var cantidad_alarmas = capas_alarmas.length


	if(alarm_panel.offsetHeight == 0 && parametro == "boton_alarma")
	{
		// Altura del panel de configuración más la altura de la alarma guardada por el número de alarmas.
		alarm_panel.style.height = alarm_panel_bloque_1.offsetHeight + (30 * cantidad_alarmas) + "px"
		alarm_button.innerHTML = "Cerrar"
	}

	if(alarm_panel.offsetHeight != 0 && parametro == "boton_alarma")
	{
		alarm_panel.style.height = "0px"
		alarm_button.innerHTML = "Alarma"
	}

	else
	{
		alarm_panel.style.height = alarm_panel_bloque_1.offsetHeight + (30 * cantidad_alarmas) + "px"
	}
}
//.......................................................






// Llamada desde client.js
// Crear los displays de las alarmas guardadas
//.............................................
function showAlarms(hora, minutos, id, parametro)
{
	clearInputs()

	// Crear capas
	//.................................................
	let alarm_container = document.createElement('div')
	let alarm_hora = document.createElement('div')
	let dos_puntos = document.createElement('p')
	let alarm_minutos = document.createElement('div')
	var alarm_icon_cross = document.createElement('div')

	// Estilos
	//..............................................
	alarm_container.classList.add('alarm-container')
	alarm_hora.classList.add('alarm-settings-hora')
	alarm_minutos.classList.add('alarm-settings-minutos')
	alarm_icon_cross.classList.add('alarm-icon-cross')

	// Insertar capas
	//.....................................
	alarm_container.appendChild(alarm_hora)
	alarm_container.appendChild(dos_puntos)
	alarm_container.appendChild(alarm_minutos)
	alarm_container.appendChild(alarm_icon_cross)
	alarm_panel_bloque_3.appendChild(alarm_container)


	// El id de la alarma cono atributo data del botón
	//................................................
	alarm_icon_cross.dataset.id = id
	//................................................


	// Insertar datos
	//.........................

	// Los if son para que siempre haya dos cifras
	if(hora < 10)
	{
		alarm_hora.innerHTML = "0" + hora
	}
	else
	{
		alarm_hora.innerHTML = hora
	}
	
	dos_puntos.innerHTML = ":"

	if(minutos < 10)
	{
		alarm_minutos.innerHTML = "0" + minutos
	}
	else
	{
		alarm_minutos.innerHTML = minutos
	}
	
	alarm_icon_cross.innerHTML = 'x'


	// Evento borrar para la cruz
	//.....................................................
	alarm_icon_cross.addEventListener('click', deleteCross)

	function deleteCross()
	{
		deleteAlarm(this.dataset.id)

		this.parentNode.remove()

		// Modificar panel
		show_hide_panel("null")
	}

	// Indica que la función es llamada
	// al publicar una alarma,
	// no al refrescar el navegador
	if(parametro == "publicar")
	{
		show_hide_panel("null")
	}
}





// Icono on
//....................
function iconoBellOn()
{
	alarm_icon.classList.add('alarm-on')
	alarm_icon.classList.remove('alarm-off')
}


// Icono off
//.....................
function iconoBellOff()
{
	alarm_icon.classList.add('alarm-off')
	alarm_icon.classList.remove('alarm-on')
}


// Icono parpadeo
//..................
function iconBlink()
{
	setTimeout(function()
	{
		alarm_icon.classList.add('alarm-on')
		alarm_icon.classList.remove('alarm-blink')
	}, 500)

	parpadeo = setTimeout(function()
	{
		alarm_icon.classList.add('alarm-blink')
		alarm_icon.classList.remove('alarm-on')
		iconBlink()
	}, 1000)
}

	

// Limpiar inputs
//....................
function clearInputs()
{
	alarm_input_hora.value    = ""
	alarm_input_minutos.value = ""
}


// Limpiamos la capa contenedora
//..............................
function clearAlarmContainer()
{
	alarm_panel_bloque_3.innerHTML = ""
}






