'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const productRepository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        res.status(200).send(await productRepository.get());
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        });
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        res.status(200).send(await productRepository.getBySlug(req.params.slug));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        res.status(200).send(await productRepository.getById(req.params.id));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        res.status(200).send(await productRepository.getByTag(req.params.tag));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O t�tulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descri��o deve conter pelo menos 3 caracteres');

    //se os dados forem inv�lidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        res.status(200).send(await productRepository.create(req.body));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        })
    }
};

exports.put = async (req, res, next) => {
    try {
        res.status(200).send(await productRepository.update(req.params.id, req.body));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        })
    }
};

exports.delete = async (req, res, next) => {
    try {
        res.status(200).send(await productRepository.delete(req.params.id));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisi��o'
        })
    }
}