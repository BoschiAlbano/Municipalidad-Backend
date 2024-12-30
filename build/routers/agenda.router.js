"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _agendaController = require("../controllers/agendaController");
var _controlToken = _interopRequireDefault(require("../middleware/controlToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _router = (0, _express.Router)();
_router.get("/agenda", _controlToken["default"], _agendaController.GET);
_router.post("/agenda", _controlToken["default"], _agendaController.POST);
_router["delete"]("/agenda/:id", _controlToken["default"], _agendaController.DELETE);
_router.put("/agenda", _controlToken["default"], _agendaController.UPDATE);
var _default = _router;
exports["default"] = _default;