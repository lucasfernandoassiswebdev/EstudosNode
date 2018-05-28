"use strict";

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async () => {
  return await Order.find({}, "number status")
    .populate("customer", "name") //populate preenche as propriedades do objeto na exibi��o do pedido
    .populate("items.product", "title"); //podem ser passadas as propriedades que desejamos que sejam preenchidas
};

exports.create = async data => {
  var order = new Order(data);
  await order.save();
};
