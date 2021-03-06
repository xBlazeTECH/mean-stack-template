const express = require('express');
const controller = require('./user.controller');
const config = require('../../config/environment');
const auth = require('../../auth/auth.service');

const router = express.Router();

router.get("/", auth.hasRole("admin"), controller.index);
router.delete("/:id", auth.hasRole("admin"), controller.destroy);
router.get("/me", auth.isAuthenticated(), controller.me);
router.put("/:id/password", auth.isAuthenticated(), controller.changePassword);
router.get("/:id", auth.isAuthenticated(), controller.show);
router.post("/", controller.create);

module.exports = router;