"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../controller/productor-controller");

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getById);
router.get("/array/:tags", controller.getByTag);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.del);

module.exports = router;
