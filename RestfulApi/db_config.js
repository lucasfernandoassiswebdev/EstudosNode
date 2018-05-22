var mongoose = require('mongoose');
mongoose.connect('mongodb://lucas:teste123@ds231070.mlab.com:31070/db_namescreencast_restful');
var Schema = mongoose.Schema;

var userSchema = Schema({
    fullname: String,
    email: String,
    password: String,
    created_at: Date
});

exports.User = mongoose.model('User', userSchema);