var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');

var allowCors = function (req, res, next) {  
    res.header('Access-Control-Allow-Origin','127.0.0.1:5000'); //Domínios autorizados a acessar a informação
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers','Content-type');
    res.header('Access-Control-Allow-Credentials','true');

    next();
}

app.listen(5000);

app.use(allowCors);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));