"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validador/dado-validado");
/**
 *  status: 200 - ok
 *          201 - created
 *          400 - erro badrequest
 *          401 - Não autenticado
 *          403 - acesso negado
 *          500 - internal server erro
 * */

exports.get = (req, res, next) => {
  Product.find({ active: true }, "title price slug")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
  Product.find(
    {
      tags: req.params.tags,
      active: true
    },
    "title description price slug tags"
  )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    {
      slug: req.params.slug,
      active: true
    },
    "title description price slug tags"
  )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
  let val = new ValidationContract();
  val.hasMinLen(
    req.body.title,
    3,
    "O Titulo deve conter pelo menos 3 caracteres."
  );
  val.hasMinLen(
    req.body.slug,
    3,
    "O Slug deve conter pelo menos 3 caracteres."
  );
  val.hasMinLen(
    req.body.descripton,
    3,
    "O Descripton deve conter pelo menos 3 caracteres."
  );
  if (!val.isValid()) {
    res
      .status(400)
      .send(val.errors())
      .end();
    return;
  }
  var product = new Product(req.body);
  product
    .save()
    .then(x => {
      res.status(201).send({ message: "Produto cadastrado com sucesso!!" });
    })
    .catch(e => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto!", data: e });
    });
};

exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title
    }
  })
    .then(x => {
      res.status(200).send({ message: "Produto cadastrado com sucesso!!" });
    })
    .catch(e => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto!", data: e });
    });
};

exports.del = (req, res, next) => {
  Product.findOneAndRemove(req.body.id)
    .then(x => {
      res.status(200).send({ message: "Produto removido com sucesso!!" });
    })
    .catch(e => {
      res.status(400).send({
        message: "Falha ao remover o produto!",
        data: e
      });
    });
};
