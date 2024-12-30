"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usuarioController = require("../controllers/usuarioController");
var _router = (0, _express.Router)();
_router.post("/login", _usuarioController.Login);
_router.post("/register", _usuarioController.Register);

// _router.post("/logout", Logout);
var _default = _router;
exports["default"] = _default;