var db = require('../db_config.js');

exports.list = function (callback) {
    db.User.find({}, function (error, users) {
        if (error)
            callback({ error: 'N�o foi poss�vel retornar os usu�rios' });
        else
            callback(users);
    });
};

exports.user = function (id, callback) {
    db.User.findById(id, function (error, user) {
        if (error)
            callback({ error: 'N�o foi poss�vel retornar o usu�rio' });
        else
            callback(user);
    });
};

exports.save = function (user, callback) {
    new db.User({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        created_at: new Date()
    }).save(function (error, user) {
        if (error)
            callback({ error: 'N�o foi poss�vel salvar o usu�rio' });
        else
            callback(user);
    });
};

exports.update = function (usuario, callback) {
    db.User.findById(usuario.id, function (error, user) {
        if (error || user == undefined)
            callback({ error: 'N�o foi poss�vel encontrar o usu�rio' });

        if (usuario.fullname)
            user.fullname = usuario.fullname;

        if (usuario.email)
            user.email = usuario.email;

        if (usuario.password)
            user.password = usuario.password;

        user.save(function (error, user) {
            if (error)
                callback({ error: 'N�o foi poss�vel salvar o usu�rio' });
            else
                callback(user);
        });
    })
};

exports.delete = function (id, callback) {
    db.User.findById(id, function (error, user) {
        if (error)
            callback({ error: 'N�o foi poss�vel retornar o usu�rio' });
        else if (user != undefined)
            user.remove(function (error) {
                if (!error)
                    callback({ response: 'Usu�rio exclu�do com sucesso' });
            });
        else
            callback({ error: 'Usu�rio n�o encontrado' });
    });
};