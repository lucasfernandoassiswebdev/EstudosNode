'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    return await Customer.find({}, 'name email password');
};

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
};