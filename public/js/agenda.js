

var container_agenda_dia    = document.getElementById('container_agenda_dia')
var container_agenda_semana = document.getElementById('container_agenda_semana')



// ******************************************************
// AGENDA DIARIA
// ******************************************************

// INPUT PARA ESCRIBIR LA HORA
function crear_input_hora(casilla_hora)
{
	// Crear input horas
	var horas = document.createElement('INPUT')
	horas.setAttribute('type', 'text')
	horas.maxLength = 2
	horas.classList.add('input-time')
	casilla_hora.appendChild(horas)

	horas.style.backgroundImage = 'url(img/fondo_00.png)'
	horas.style.backgroundSize = "cover"

	// Obtener valor al perder al foco
	horas.addEventListener('blur', obtener_horas)
	function obtener_horas()
	{
		var valor_horas = horas.value
		console.log(valor_horas)
	}


	// CAPA DOS PUNTOS
	var dos_puntos = document.createElement('div')
	dos_puntos.classList.add('dos-puntos')
	casilla_hora.appendChild(dos_puntos)
	dos_puntos.style.backgroundImage = 'url(img/dos_puntos.png)'
	dos_puntos.style.backgroundSize = "cover"


	// Crear input minutos
	var minutos = document.createElement('INPUT')
	minutos.setAttribute('type', 'text')
	minutos.maxLength = 2
	minutos.classList.add('input-time')
	casilla_hora.appendChild(minutos)

	minutos.style.backgroundImage = 'url(img/fondo_00.png)'
	minutos.style.backgroundSize = "cover"
	
	// Obtener valor al perder al foco
	minutos.addEventListener('blur', obtener_minutos)
	function obtener_minutos()
	{
		var valor_minutos = minutos.value
		console.log(valor_minutos)
	}



	// Borrar imagen al hacer foco
	horas.addEventListener('focus', borrar_fondo)
	minutos.addEventListener('focus', borrar_fondo)

	function borrar_fondo()
	{
		this.style.backgroundImage   = 'none'
	}
}

	



// ACTIVAR Y DESACTIVAR ALERTAS
function activar_desactivar_alertas()
{
	button_alertas.classList.toggle('alertas-on')
	button_alertas.classList.toggle('alertas-off')
}
var button_alertas = document.getElementById("activar_desactivar_alertas" )
button_alertas.addEventListener('click', activar_desactivar_alertas)
button_alertas.classList.toggle('alertas-on') // Poner la clase por defecto










