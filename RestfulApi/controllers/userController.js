var db = require('../db_config.js');

exports.list = function (callback) {
    db.User.find({}, function (error, users) {
        if (error)
            callback({ error: 'Não foi possível retornar os usuários' });
        else
            callback(users);
    });
};

exports.user = function (id, callback) {
    db.User.findById(id, function (error, user) {
        if (error)
            callback({ error: 'Não foi possível retornar o usuário' });
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
            callback({ error: 'Não foi possível salvar o usuário' });
        else
            callback(user);
    });
};

exports.update = function (usuario, callback) {
    db.User.findById(usuario.id, function (error, user) {
        if (error || user == undefined)
            callback({ error: 'Não foi possível encontrar o usuário' });

        if (usuario.fullname)
            user.fullname = usuario.fullname;

        if (usuario.email)
            user.email = usuario.email;

        if (usuario.password)
            user.password = usuario.password;

        user.save(function (error, user) {
            if (error)
                callback({ error: 'Não foi possível salvar o usuário' });
            else
                callback(user);
        });
    })
};

exports.delete = function (id, callback) {
    db.User.findById(id, function (error, user) {
        if (error)
            callback({ error: 'Não foi possível retornar o usuário' });
        else if (user != undefined)
            user.remove(function (error) {
                if (!error)
                    callback({ response: 'Usuário excluído com sucesso' });
            });
        else
            callback({ error: 'Usuário não encontrado' });
    });
};