const express = require('express');
const app = express();

//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');
const birdsRoute = require('./routes/birdsRoute');
const testeRoute = require('./routes/testeRoute');

app.use('/', index);
app.use('/persons', personRoute);
app.use('/birds', birdsRoute);
app.use('/teste', testeRoute);

module.exports = app;
