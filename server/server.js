'use strict'

const express = require('express')
const app = express()
//........................................



app.use(express.static('public'))
//........................................



var port = process.env.PORT || 3000

app.listen(port, () => { console.log('Ejecutando en 3000') })