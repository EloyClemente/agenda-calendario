

// OBJETO CON MÉTODOS DE TIEMPO
//.............................

var Tiempo = {

	today: function()
	{
		return new Date()
	},

	year: function()
	{
		return this.today().getFullYear()
	},

	month: function()
	{
		return this.today().getMonth()
	},

	week: function()
	{
		return this.today().getDay()
	},

	day: function()
	{
		return this.today().getDate()
	},

	hour: function()
	{
		return this.today().getHours()
	},

	minute: function()
	{
		return this.today().getMinutes()
	},

	second: function()
	{
		return this.today().getSeconds()
	},
}

// Se trata de un objeto con una lista de métodos.
// La llamada se hace así Tiempo.second()

































