"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("./config"));
var _cors = _interopRequireDefault(require("cors"));
var _agenda = _interopRequireDefault(require("./routers/agenda.router"));
var _usuario = _interopRequireDefault(require("./routers/usuario.routers"));
var _handleErrors = _interopRequireDefault(require("./middleware/handleErrors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import cookieParser from "cookie-parser";

var app = (0, _express["default"])();
app.use((0, _cors["default"])()); // permite que los navegadores puedan hacer o no solicitudes dependiendo del domino que vengan

// Middleware para parsear cookies
// app.use(cookieParser());

//settings
app.set("port", _config["default"].port);

// middlewares
app.use(_express["default"].json()); // interprete json
app.use(_express["default"].urlencoded({
  extended: false
})); // permite ver el body de las peticiones

// const corsOptions = {
//     origin: process.env.CORS_FRONTEND, // Permitir a un dominio en especifico
//     credentials: true, // Permitir credenciales
// };

// app.use(cors(corsOptions)); // permite que los navegadores puedan hacer o no solicitudes dependiendo del domino que vengan

// rutas
app.use(_usuario["default"]);
app.use(_agenda["default"]);

// http://localhost:4000/
app.use("/", function (req, res) {
  res.send("<h1> Pagina de Inicio </h1>");
});

// cunado no encuentre una ruta
app.use(function (req, res) {
  res.status(404).json({
    error: "No existe la ruta"
  });
});

// manejar errores de los try catch
app.use(_handleErrors["default"]);
var _default = app;
exports["default"] = _default;