"use strict";

const orderRepository = require("../repositories/order-repository");
const guid = require("guid");
const authService = require("../services/auth-service");

exports.get = async (req, res, next) => {
  try {
    res.status(200).send(await orderRepository.get());
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição " + e.message
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    //recupera o token
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    //decodifica o token
    const data = await authService.decodeToken(token);

    await orderRepository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: req.body.items
    });

    res.status(201).send({
      message: "Pedido cadastrado com sucesso!"
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição " + e.message
    });
  }
};
