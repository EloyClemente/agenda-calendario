document.addEventListener('DOMContentLoaded', function(){





// PARA LA OBTENCIÓN DE LAS FECHAS
function fecha_por_dia(dia)
{
	var fecha_actual = new Date()
	var ano_actual   = fecha_actual.getFullYear()

	var fecha_inicio = new Date(ano_actual, 0)

	return new Date(fecha_inicio.setDate(dia))
}



var posicion

function ejecutar()
{
	var lista_meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
	var dias_semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]



	for(i=1; i < 762; i++)
	{
		var fecha = fecha_por_dia(i)

		var ano = fecha.getFullYear()
		var mes = fecha.getMonth()
		var dia = fecha.getDate()
		var sem = fecha.getDay()



			// Este algoritmo localiza la posición correcta de la capa según el día de la semana.
			// El problema está en que el array comienza por el domingo, que tiene el índice 0.
			// Si es día 1, y el día de la semana es 0 (domingo), la posición en la retícula es la nº 6,
			// según el array children[]. O sea, la que correspondería al domingo en el calendario.
			// Partiendo de esta base, la casilla correcta siempre es un número menos del que indica el array getDay().
			// Por ejemplo, si es lunes, el array indica el índice 1 (porque el array comienza por el domingo que es el 0).
			// Sin embargo la casilla que corresponde al lunes es la primera (que en el array de children[] correspondería al 0).
			//  Por eso se resta un número, para que el lunes quede en la primera casilla.
			// Esta operación sirve sólo para localizar la casilla de partida del año. 
			// El recorrido de las casillas se realiza con el else que incrementa en 1 el valor de la variable posicion.

			if(dia == 1)
			{
				if(sem == 0)
				{
					posicion = 6
				}
				else
				{
					posicion = sem - 1
				}
			}
			else
			{
				posicion = posicion + 1
			}



		var localizar_mes = document.getElementsByClassName('container-dias')

		var localizar_dia = localizar_mes[mes].children[posicion]

		localizar_dia.setAttribute('data-sem', dias_semana[sem]) // LOCALIZADAS LAS CAPAS PARA PONERLES LOS DATA
		localizar_dia.setAttribute('data-semnum', sem) // Cifra para el input fecha del formulario
		localizar_dia.setAttribute('data-dia', dia)
		localizar_dia.setAttribute('data-mes', lista_meses[mes])
		localizar_dia.setAttribute('data-mesnum', mes)
		localizar_dia.setAttribute('data-ano', ano)

		localizar_dia.addEventListener('click', getFecha) // Llamada a la función en get-dates
		localizar_dia.addEventListener('click', obtener_data)
		localizar_dia.addEventListener('mousedown', poner_color)
		localizar_dia.addEventListener('mouseup', quitar_color)

		// Muestra los eventos de la capa clicada
		//........................................................
		localizar_dia.addEventListener('click', filtrar_por_fecha)

		


	

	} // for(i=1; i < 366; i++)

}
ejecutar()





// OBTENER DATA
function obtener_data()
{
	var fecha_de_eventos = document.getElementById('fecha_de_eventos')
	fecha_de_eventos.innerHTML = "<p class='fecha-evento'>" + "\u0009" +  "\u0020" + this.dataset.sem + " " + this.dataset.dia + " " + "de " + "" + this.dataset.mes + " " + "de " + this.dataset.ano + "</p>"
}






function poner_color()
{
	this.style.transition = "all, .08s"
	this.style.boxShadow = "0px 2px 3px #000 inset"
}
function quitar_color()
{
	this.style.boxShadow = "none"
}




// function location()
// {
// 	let ano = this.dataset.ano
// 	let mes = this.dataset.mesnum
// 	let dia = this.dataset.dia

// 	var form_fecha_eventos = ano + mes + dia

// 	window.location = form_fecha_eventos
// }












//...........................................................
// ASIGNAR FECHA AL INPUT DEL FORMULARIO A TRAVÉS DE LOS DATA
// var hidden_post_fecha = document.getElementById('hidden_post_fecha')



// function location()
// {
// 	console.log('ok')
// 	let ano = this.dataset.ano
// 	let mes = this.dataset.mesnum
// 	let dia = this.dataset.dia

// 	var form_fecha_eventos = ano + mes + dia


// 	// ASIGNAR URL AL CLICAR LAS CAPAS DE LOS DÍAS
// 	window.location = form_fecha_eventos	

	
// }



// function asignar_fecha_formulario()
// {
	
// 	let ano = this.dataset.ano
// 	let mes = this.dataset.mesnum
// 	let dia = this.dataset.dia

// 	var form_fecha_eventos = ano + mes + dia

// 	hidden_post_fecha.value = form_fecha_eventos // Fecha para el input

// 	console.log(hidden_post_fecha)

// }
// //...........................................................









});