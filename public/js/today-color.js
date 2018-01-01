document.addEventListener('DOMContentLoaded', function(){

let ano = Tiempo.year()
let mes = Tiempo.month()
let dia = Tiempo.day()

let fecha = `${ano}${mes}${dia}`


// localizamos el día de hoy 
//......................................
let capaHoy = document.getElementById(fecha)




// Esto es un hack chapucero 
// para que le de tiempo a cargar
// a client.js y poder cambiar 
// el color. Buscar una forma mejor
setTimeout(function()
{
	capaHoy.style.color = "#fff"
}, 100)

	


});