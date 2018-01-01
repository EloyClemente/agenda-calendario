
var input_fecha = document.getElementById('hidden_post_fecha')

// Asignamos la fecha al input, 
// a través de los atributos data del día clicado
function getFecha()
{
	var fecha = this.dataset.ano + this.dataset.mesnum + this.dataset.dia
	input_fecha.value = fecha

	return fecha
}


