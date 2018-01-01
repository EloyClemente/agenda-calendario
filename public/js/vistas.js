document.addEventListener('DOMContentLoaded', function(){

var container_calendario = document.getElementById('container_calendario')



// Vistas ----------------------------------------------------------------------
var boton_expandir_contraer = document.getElementById('boton_expandir_contraer')
var boton_ver_ocultar       = document.getElementById('boton_ver_ocultar')
var contador_1 = 0
var contador_2 = 0


// Zoom ----------------------------------------------------
var capa_mes   = document.querySelectorAll('.container-mes')
var capa_enero = document.getElementById('mes_1')
var medida_container = 180
var medida_mes       = 130


// Quitar y poner padding --------------------------------
var capa_dia = document.getElementsByClassName('capa-dia')





// NOTA: La medida "auto" no soporta transiciones. Es por ello por lo que 
// aquí le doy su propia medida en pixels. Para que, al cambiar las 
// dimensiones, me haga la transición. 
// El setTimeout() es para que le dé tiempo a cargar la medida. Sin él no funciona.

// VISTA OCULTA
function vista_oculta()
{
	container_calendario.style.height = container_calendario.offsetHeight + "px"

	setTimeout(function(){

		// Medidas container
		container_calendario.style.height = "0px"

		// Medidas meses
		restaurar_meses()

		// Para el zoom
		medida_container = 180

		// Botones
		boton_ver_ocultar.innerHTML       = "Mostrar"
		boton_expandir_contraer.innerHTML = "Expandir"

		limpiar_clase()

	}, 10)

	
}


// VISTA NORMAL
function vista_normal()
{
	container_calendario.style.height = container_calendario.offsetHeight + "px"

	setTimeout(function(){

		// Medidas container
		restaurar_container()

		// Medidas meses
		restaurar_meses()

		// Para el zoom
		medida_container = 180

		// Botones
		boton_ver_ocultar.innerHTML       = "Ocultar"
		boton_expandir_contraer.innerHTML = "Expandir"

		limpiar_clase()

	}, 10)
}


// VISTA EXPANDIDA
function vista_expandida()
{
	// Medidas container
	container_calendario.classList.add('expandido')
	container_calendario.style.height = "auto"

	// Botones
	boton_ver_ocultar.innerHTML       = "Ocultar"
	boton_expandir_contraer.innerHTML = "Contraer"
}
//**************************************************





// LLAMADA A LAS VISTAS
function vistas(event)
{
	if(event.target.innerHTML      == "Ocultar")
	{
		vista_oculta()
	}
	else if(event.target.innerHTML == "Mostrar")
	{
		vista_normal()
	}
	else if(event.target.innerHTML == "Expandir")
	{
		vista_expandida()
	}
	else
	{
		vista_normal()
	}
}
boton_ver_ocultar.addEventListener('click', vistas)
boton_expandir_contraer.addEventListener('click', vistas)





// ELIMINAMOS LA CLASE 
// PARA QUE NO INTERFIERA
function limpiar_clase()
{
	if(container_calendario.classList.contains('expandido'))
	{
		container_calendario.classList.remove('expandido')
	}
}















// ZOOM ***********************************************************************

// BOTÓN ZOOM MÁS
document.getElementById('zoom_mas').addEventListener('click', function(event){

		// if(medida_mes < 860)
		// {
		// 	medida_mes = medida_mes + 20
		// 	container_calendario.style.height = "auto"
		// 	medidas_mes()
		// }	
})


// BOTÓN ZOOM MENOS
document.getElementById('zoom_menos').addEventListener('click', function(event){

		// if(medida_mes > 110)
		// {
		// 	medida_mes = medida_mes - 20
		// 	container_calendario.style.height = "auto"
		// 	medidas_mes()
		// }	
})






// MEDIDAS CAPA MES
function medidas_mes()
{
	for(var i=0; i <= 12-1; i++)
	{
		capa_mes[i].style.width  = medida_mes + "px"
		capa_mes[i].style.height = medida_mes + "px"
	}	
}








// RESTAURAR MEDIDAS
function restaurar_medidas()
{
	medida_container = 180
	medida_mes       = 130

	restaurar_container()
	restaurar_meses()
}
document.getElementById('restaurar_zoom').addEventListener('click', restaurar_medidas)



function restaurar_container()
{
	container_calendario.style.height = "180px"

	medida_container = 180
}


function restaurar_meses()
{
	for(var i=0; i <= 12-1; i++)
	{
		capa_mes[i].style.width     = "130px"
		capa_mes[i].style.height    = "130px"
	}
	medida_mes = 130
}





});