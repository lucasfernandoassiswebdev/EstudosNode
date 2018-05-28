"use strict";

const mongoose = require("mongoose");
const ValidationContract = require("../validators/fluent-validator");
const customerRepository = require("../repositories/customer-repository");
const md5 = require("md5");
const emailService = require("../services/email-service");
const authService = require("../services/auth-service");

exports.get = async (req, res, next) => {
  try {
    res.status(200).send(await customerRepository.get());
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    res.status(200).send(await customerRepository.getById(req.params.id));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );
  contract.isEmail(
    req.body.email,
    "O email deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.password,
    6,
    "A senha deve conter pelo menos 6 caracteres"
  );

  if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  try {
    await customerRepository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ["user"]
    });

    emailService.send(
      req.body.email,
      "Bem vindo ao node-store",
      global.EMAIL_TMPL.replace("{0}", req.body.name)
    );

    res.status(201).send({
      message: "Cliente cadastrado com sucesso!"
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await customerRepository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    if (!customer) {
      res.status(404).send({
        message: "Usuário ou senha inválidos!"
      });

      return;
    }

    const token = await authService.generateToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);

    const customer = await customerRepository.getById(data.id);

    if (!customer) {
      res.status(404).send({
        message: "Usuário ou senha inválidos!"
      });

      return;
    }

    const tokenData = await authService.generateToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    });

    res.status(201).send({
      token: tokenData,
      data: {
        email: customer.email,
        name: customer.name
      }
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).send(await customerRepository.delete(req.params.id));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};
