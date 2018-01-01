document.addEventListener('DOMContentLoaded', function(){

var container_calendario = document.getElementById('container_calendario')
var container_mes = document.getElementsByClassName('container-mes')
var container_titulo_letras = document.getElementsByClassName('container-titulo-letras')


// Para obtener los atributos data de las capas día
var fecha_de_evento = document.getElementsByClassName('fecha-tarea-dia')





// LLAMAR A LAS FUNCIONES CREADORAS
//..................................
function crear_calendario()
{
	capas_meses()
	container_cabecera()
	container_dias()
	nombre_mes()
	dias_semana()
	capas_dias()
}
crear_calendario()






// UN CONTAINER PARA CADA MES
//............................
function capas_meses() 
{
	for(let i=1; i <= 25; i++)
	{
		let capa_mes = document.createElement('div')

		capa_mes.classList.add('container-mes')
		capa_mes.classList.add('container-mes-contraer')

		capa_mes.id = "mes_" + i

		container_calendario.appendChild(capa_mes)
	}
}






// CONTAINER PARA EL TÍTULO Y DÍAS DE LA SEMANA
//..............................................
function container_cabecera()
{
	for(let i=1; i <= 25; i++)
	{
		let container_titulo_letras = document.createElement('div')

		container_titulo_letras.classList.add('container-titulo-letras')

		container_mes[i-1].appendChild(container_titulo_letras)
	}
}






// CONTAINER PARA LOS DÍAS DEL MES
//.................................
function container_dias()
{
	for(let i=1; i <= 25; i++)
	{
		let container_capas_dias = document.createElement('div')

		container_capas_dias.classList.add('container-dias')

		container_mes[i-1].appendChild(container_capas_dias)
	}
}









// INSERTAR EL NOMBRE DE LOS MESES
//.................................
function nombre_mes()
{
	var cont = Tiempo.month() // Mes actual

	var lista_meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


	for(let i=1; i <= 25; i++)
	{
		//...............................................
		let capa_nombre_mes = document.createElement('p')
		capa_nombre_mes.classList.add('nombre-mes')
		container_titulo_letras[i-1].appendChild(capa_nombre_mes)
		//.......................................................


		capa_nombre_mes.innerHTML = lista_meses[cont] // Escribir el mes correspondiente


		if(cont == 11) // Evitamos que el incremento pase de 11
		{
			cont = -1 // Es -1 porque luego el cont++ le suma 1, dejándolo en 0
		}
		cont++
	}
}









// INSERTAR LOS DÍAS DE LA SEMANA
//................................
function dias_semana()
{
	let dias_semana = ["L", "M", "X", "J", "V", "S", "D"]


	for(var i=0; i < 25; i++)
	{
		for(let x=0; x <= 6; x++)
		{
			let dia_semana = document.createElement('p')

			dia_semana.classList.add('dias-semana')

			dia_semana.innerHTML = dias_semana[x]

			container_titulo_letras[i].appendChild(dia_semana)
		}
	}
}






// INSERTAR LAS CAPAS PARA LOS DÍAS
//..................................
function capas_dias()
{
	var container_dias = document.getElementsByClassName('container-dias')


	for(var i=0; i < 25; i++)
	{
		for(let x=1; x <= 42; x++)
		{
			// Crear capas de los días
			var capa_dia = document.createElement('div')
			capa_dia.classList.add('capa-dia')


			// Insertar las capas de los días en el container
			container_dias[i].appendChild(capa_dia)
		}
	}
}
	





});