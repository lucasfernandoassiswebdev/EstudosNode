"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const productRepository = require("../repositories/product-repository");
const azure = require("azure-storage");
const guid = require("guid");
var config = require("../config");

exports.get = async (req, res, next) => {
  try {
    res.status(200).send(await productRepository.get());
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    res.status(200).send(await productRepository.getBySlug(req.params.slug));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    res.status(200).send(await productRepository.getById(req.params.id));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    res.status(200).send(await productRepository.getByTag(req.params.tag));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres"
  );

  //se os dados forem inválidos
  if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  try {
    //cria o Blob Service
    const blobSvc = azure.createBlobService(config.containerConnectionString);

    let filename = guid.raw().toString() + ".jpg";
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], "base64");

    //salva a imagem
    if (req.body.image) {
      await blobSvc.createBlockBlobFromText(
        "product-images",
        filename,
        buffer,
        {
          contentType: type
        },
        function(error, result, response) {
          if (error) filename = "default-product.png";
        }
      );
    }

    await productRepository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image: "url-do-container/" + req.body.image //nome do arquvio
    });

    res.status(201).send({
      message: "Produto cadastrado com sucesso"
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    res
      .status(200)
      .send(await productRepository.update(req.params.id, req.body));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).send(await productRepository.delete(req.params.id));
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição"
    });
  }
};
