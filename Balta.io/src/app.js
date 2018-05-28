const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

var app = express();
const router = express.Router();

//conecta ao banco
mongoose.connect(config.connectionString);

//Carrega os Models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

//carrega as rotas
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const orderRoutes = require("./routes/order");

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({extended: false}));

//habilita o CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methors", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);

module.exports = app;
