const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const router = express.Router();
const mongoose = require('mongoose');

//conecta ao banco
mongoose.connect('mongodb://lucas:teste123@ds231070.mlab.com:31070/db_namescreencast_restful');

//Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//carrega as rotas
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);

module.exports = app;