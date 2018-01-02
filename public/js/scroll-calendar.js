document.addEventListener('DOMContentLoaded', function(){

const container_calendario = document.getElementById('container_calendario')



function scrollCalendar()
{
	let viewport = window.innerWidth

	let ano = Tiempo.year()
	let mes = Tiempo.month()
	let dia = Tiempo.day()

	let fecha = `${ano}${mes}${dia}`


	// localizamos el día de hoy 
	//......................................
	let hoy = document.getElementById(fecha)


	// Localizamos su posición
	//...................................................
	// let posicionScroll = hoy.getBoundingClientRect().left - (viewport / 2)
	let posicionScroll = hoy.getBoundingClientRect().left


	// Movemos el scroll a la posición del día de hoy
	//................................................
	container_calendario.scrollLeft = posicionScroll



}
// scrollCalendar()




});