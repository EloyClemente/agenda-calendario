'use strict'

var container_fecha = document.getElementById('container_fecha')



// MOTOR DEL RELOJ Y FECHA
// En este caso el setInterval()
// se encuentra en el timer.
// setInterval(function(){
// }, 1000)



// Llamada desde el timer
//.......................
function clockDate()
{
	
	reloj() // Actualizar reloj
	
	if(Tiempo.hour() == 0 && Tiempo.minute() == 0 && Tiempo.second() == 0) // Actualizar fecha a las 00:00:00
	{
		fecha()
	}
}





// FECHA
function fecha()
{
	let array_sem = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ]
	let array_mes = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]

	container_fecha.innerHTML = array_sem[Tiempo.week()] + "\u0009" + Tiempo.day() + "\u0009" + array_mes[Tiempo.month()] + "\u0009" + Tiempo.year()
}
fecha()
	





// RELOJ
function reloj()
{
	var hours   = Tiempo.hour()
	var minutes = Tiempo.minute()
	var seconds = Tiempo.second()

	if( Tiempo.hour()    < 10 ){ hours   = "0" + Tiempo.hour();   }
	if( Tiempo.minute()  < 10 ){ minutes = "0" + Tiempo.minute(); }
	if( Tiempo.second()  < 10 ){ seconds = "0" + Tiempo.second(); }

	document.getElementById('container_reloj').textContent = hours + ":" + minutes + ":" + seconds
}
reloj()



