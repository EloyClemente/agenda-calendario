'use strict'


// ASIGNAR EL VALOR DE LA FECHA AL INPUT HIDDEN
// A PARTIR DE LA RUTA DE LA URL ACTUAL.
// ESTA HA SIDO OBTENIDA AL CLICAR EN LAS
// CAPAS DÍAS, LAS CUALES SON ENLACES


// Obtenemos la ruta 
// (el parámetro final de la url actual)
var pathname = window.location.pathname;

// Eliminamos la barra del inicio
var ruta = pathname.substr(1,7)



// Localizamos el input hidden de la fecha
var hidden_post_fecha = document.getElementById('hidden_post_fecha')
//var hidden_update = document.getElementById('hidden_update')
//var hidden_delete = document.getElementById('hidden_delete_fecha')

// Y le asignamos la ruta como valor
hidden_post_fecha.value = ruta
// hidden_update.value = ruta
// hidden_delete_fecha.value = ruta


// console.log(hidden_update)
// console.log(hidden_delete_fecha)


// RUTA PARA EL ACTION DEL FORMULARIO
// var formulario = document.getElementById('formulario')

// Pasamos al action del formulario
// la ruta obtenida más arriba
// formulario.action = pathname 


