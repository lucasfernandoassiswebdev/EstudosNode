"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer-controller");
const authService = require("../services/auth-service");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.post("/authenticate", controller.authenticate);
router.post("/refresh-token", authService.authorize, controller.refreshToken);
router.delete("/:id", controller.delete);

module.exports = router;
