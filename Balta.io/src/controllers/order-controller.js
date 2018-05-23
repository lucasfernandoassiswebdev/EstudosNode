'use strict';

const orderRepository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        res.status(200).send(await orderRepository.get());
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ' + e.message
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        await orderRepository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
            
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ' + e.message
        })
    }
};