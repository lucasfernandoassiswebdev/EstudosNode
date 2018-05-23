const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    title: { //schema cria o _id(guid) automaticamente
        type: String,
        required: true, //obrigat�rio
        trim: true  //remove os espa�os antes e depois da strimg 
    },
    slug: { //comp�e a url -> cadeira gamer = cadeira-gamer
        type: String,
        required: [true, 'o slug � obrigat�rio'],
        trim: true,
        index: true, //indice que ser� usado na busca
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true //Default do valor
    },
    tags: [{ //Isso permite que tags seja um array de strings
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Product', product);