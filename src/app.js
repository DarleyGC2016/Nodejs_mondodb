"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb://127.0.0.1:27017/node", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//carregar os models
const Product = require("./models/product");

// Carregar as rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
