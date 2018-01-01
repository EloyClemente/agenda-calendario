'use strict'

var capa_botones
var update_buttons
var delete_buttons


// CREAR LAS CAPAS
// E INSERTAR LOS DATOS
//........................
function insertar(eventos)
{
	// Crear capas
	//..............................................
	var capa_entrada = document.createElement('div')
	var capa_hora    = document.createElement('p')
	var capa_evento  = document.createElement('p')

	// Darles estilos
	//.........................................
	capa_entrada.classList.add('capa-entradas')
	capa_hora.classList.add('capa-hora')
	capa_evento.classList.add('capa-evento')


	capa_entrada.appendChild(capa_hora)
	capa_entrada.appendChild(capa_evento)


	// Insertar datos
	//..................................
	capa_hora.innerHTML   = eventos.hora
	capa_evento.innerHTML = eventos.evento


	// Crear botones
	// Pasamos la variable eventos
	// para poder asignar a cada botón
	// el id del evento que le corresponda
	//.....................................
	buttons(eventos)

	// Insertar botones en las capas
	//....................................
	capa_entrada.appendChild(capa_botones)


	// Insertar todo en el DOM
	//.................................
	container_entradas.appendChild(capa_entrada)
}



// CREAR BOTONES
//.......................
function buttons(eventos)
{
	capa_botones   = document.createElement('div')
	update_buttons = document.createElement('p')
	delete_buttons = document.createElement('p')

	// Texto
	//.................................
	update_buttons.innerHTML = "Update"
	delete_buttons.innerHTML = "Delete"

	// Estilos
	//.............................................
	capa_botones.classList.add('container-botones')
	update_buttons.classList.add('update-buttons')
	delete_buttons.classList.add('delete-buttons')

	// Asignamos al botón el id del evento como 
	// atributo data, para poder borrarlo de la base de datos
	delete_buttons.dataset.evento_id = eventos._id


	capa_botones.appendChild(update_buttons)
	capa_botones.appendChild(delete_buttons)
}