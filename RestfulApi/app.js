var app = require('./app_config.js');
var validator = require('validator');
var userController = require('./controllers/userController');

app.get('/', function (req, res) {
    res.end('Servidor ON!');
});

app.get('/users', function (req, res) {
    userController.list(function (response) {
        res.json(response);
    });
});

app.get('/users/:id', function (req, res) {
    var id = validator.trim(validator.escape(req.params.id));

    userController.user(id, function (response) {
        res.json(response);
    });
});

app.post('/users', function (req, res) {
    userController.save(montaUser(req), function (response) {
        res.json(response);
    });
});

app.put('/users/:id', function (req, res) {
    userController.update(montaUser(req), function (response) {
        res.json(response);
    });
});

app.delete('/users/:id', function (req, res) {
    var id = validator.trim(validator.escape(req.params.id));

    userController.delete(id, function (response) {
        res.json(response);
    });
});

function montaUser(req) {
    return {
        id: req.params.id != null ? validator.trim(validator.escape(req.params.id)) : null,
        fullname: req.body.fullname != null ? validator.trim(validator.escape(req.body.fullname)) : null,
        email: req.body.email != null ? validator.trim(validator.escape(req.body.email)) : null,
        password: req.body.password != null ? validator.trim(validator.escape(req.body.password)) : null
    }
}
