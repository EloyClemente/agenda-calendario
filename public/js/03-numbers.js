document.addEventListener('DOMContentLoaded', function(){

var lista_meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
var dias_semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

var capas_meses = document.getElementsByClassName('container-dias')
var cont_meses  = -1
var posicion



function load_calendar()
{
	var cont_dias = 1

	for(var i=1; i < 762; i++)
	{
		var primero = new Date(Tiempo.year(), Tiempo.month() - 12)
		var segundo = new Date(primero.setDate(cont_dias))


		var ano = segundo.getFullYear() // Para crear el id de las capas
		var mes = segundo.getMonth()
		var sem = segundo.getDay()
		var dia = segundo.getDate()



		// Para que el primer día sea
		// impreso en el día de la 
		// semana correspondiente
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
		//............................
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
		//............................



		// Capas para los números
		//.......................................
		var numeros = document.createElement('p')
		numeros.classList.add('numeros')
		//.......................................



		// Para cambiar de capa-mes cada día 1
		//....................................
		if(dia == 1)
		{
			cont_meses = cont_meses + 1
		}
		//....................................



		// A las 0:00 pintamos las casillas de blanco...
		capas_meses[cont_meses].children[posicion].style.backgroundColor = "#fff"
		capas_meses[cont_meses].children[posicion].style.border = "1px solid #fff"


		// ...borramos todos los números...
		capas_meses[cont_meses].children[posicion].innerHTML = ""


		// ...y luego los redibujamos
		// ATENCIÓN: PUEDE DAR ERROR SI EL Nº DE DÍAS NO COINCIDE CON EL Nº DE CAPAS
		//...........................................................................
		capas_meses[cont_meses].children[posicion].appendChild(numeros)
		numeros.innerHTML = dia
	


		// Creamos el id que nos permitirá
		// marcar los días con evento
		//......................................
		var identificador = `${ano}${mes}${dia}`
		numeros.id = identificador
		//......................................



		//..................................................................................
		// COLOREAR LOS FINES DE SEMANA
		if(sem == 6 || sem == 0)
		{
			capas_meses[cont_meses].children[posicion].style.backgroundColor = "#e2efff"
			capas_meses[cont_meses].children[posicion].style.border = "1px solid #e2efff"
		}	
		//..................................................................................
		




		var localizar_mes = document.getElementsByClassName('container-dias')

		var localizar_dia = localizar_mes[cont_meses].children[posicion]

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




		cont_dias ++
	}
}
load_calendar()




		

// MARCAR EL DÍA ACTUAL
//.....................
function updateDay()
{
	let today = `${Tiempo.year()}${Tiempo.month()}${Tiempo.day()}`

	let diaDeHoy = document.getElementById(today)

	diaDeHoy.parentNode.style.backgroundColor = "royalblue"
	diaDeHoy.style.color = "#fff"
}
updateDay()






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






});