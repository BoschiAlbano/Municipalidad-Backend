"use strict";

var ERROR_HANDLERS = {
  ReferenceError: function ReferenceError(res) {
    return res.status(400).send({
      error: 'Error en la Consulta SQL, ReferenceError'
    });
  },
  CastError: function CastError(res) {
    return res.status(400).send({
      error: 'id used is malformed'
    });
  },
  ValidationError: function ValidationError(res, _ref) {
    var message = _ref.message;
    return res.status(409).send({
      error: message
    });
  },
  JsonWebTokenError: function JsonWebTokenError(res) {
    return res.status(401).json({
      error: 1,
      mensaje: "Token Invalido"
    });
  },
  TokenExpirerError: function TokenExpirerError(res) {
    return res.status(401).json({
      error: 1,
      mensaje: 'Token Expirado'
    });
  },
  RequestError: function RequestError(res) {
    return res.status(401).json({
      error: 1,
      mensaje: 'Error en la Consulta SQL'
    });
  },
  TypeError: function TypeError(res) {
    return res.status(401).json({
      error: 1,
      mensaje: 'Error en la Consulta SQL'
    });
  },
  ErrorBaseDatos: function ErrorBaseDatos(res) {
    return res.status(401).json({
      error: 1,
      mensaje: 'Error en la Base de datos'
    });
  },
  TokenExpiredError: function TokenExpiredError(res) {
    return res.status(401).json({
      error: 1,
      mensaje: 'Token Expirado'
    });
  },
  defaultError: function defaultError(res, error) {
    console.error(error.name);
    res.status(500).end();
  }
};
module.exports = function (error, request, response, next) {
  var handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error);
};