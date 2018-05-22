var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');

app.listen(5000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));