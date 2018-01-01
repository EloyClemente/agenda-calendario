



// Llamada desde client.js
//............................
function deleteButtonsAction()
{
	var delete_buttons = document.getElementsByClassName('delete-buttons')


	for(let i=0; i < delete_buttons.length; i++)
	{
		// Asignar a los botones los eventos de borrado
		//......................................................
		delete_buttons[i].addEventListener('click', deleteEvent)
		delete_buttons[i].addEventListener('click', borrarCapa)
	}
}




// Emite a server.js con el _id del evento que se ha de borrar
//............................................................
function deleteEvent()
{
	socket.emit('borrarEvento', this.dataset.evento_id)
}


// Borramos la capa contenedora del evento
//........................................
function borrarCapa()
{
	this.parentNode.parentNode.remove()
}








