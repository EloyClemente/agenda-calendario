

// Motor del timer
//....................
setInterval(function()
{
	timer()
}, 1000)


function timer()
{
	var ano     = Tiempo.year()
	var mes     = Tiempo.month()
	var dia     = Tiempo.day()
	var hora    = Tiempo.hour()
	var minuto  = Tiempo.minute()
	var segundo = Tiempo.second()


	clockDate()
	updateCalendar()
	revisarAlarmas()
}
//..................................




function revisarAlarmas()
{
	// timerCalls() está en client.js
	//..........................................
	alarm_status == true ? timerCalls() : false
}




function updateCalendar()
{
	// Si los tres coinciden en cero, actualizar calendario y dia de hoy
	//....................................................................
	if(Tiempo.hour() == 0 && Tiempo.minute() == 0 && Tiempo.second() == 0)
	{
		load_calendar()
		updateDay()
	}
}

