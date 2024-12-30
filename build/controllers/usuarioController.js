"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = exports.Login = void 0;
var _connection = require("../database/connection");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _zod = require("zod");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // servicios de consulta a la base de datos
// Definir el esquema de validación
var registerSchema = _zod.z.object({
  Nombre: _zod.z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50, "El nombre no puede exceder 50 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
  Apellido: _zod.z.string().min(2, "El apellido debe tener al menos 2 caracteres").max(50, "El apellido no puede exceder 50 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),
  Dni: _zod.z.string().length(8, "El DNI debe tener 8 dígitos").regex(/^\d+$/, "El DNI solo puede contener números"),
  Email: _zod.z.string().email("Email inválido").max(100, "El email no puede exceder 100 caracteres"),
  Password: _zod.z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(100, "La contraseña no puede exceder 100 caracteres").regex(/[A-Z]/, "Debe contener al menos una mayúscula").regex(/[0-9]/, "Debe contener al menos un número").regex(/[!@#$%^&*]/, "Debe contener al menos un carácter especial")
});
var Register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var validatedData, hashedPassword, query, pool, request;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Validar los datos de entrada
            validatedData = registerSchema.parse(req.body); // Encriptar password
            _context.next = 4;
            return _bcrypt["default"].hash(validatedData.Password, 10);
          case 4:
            hashedPassword = _context.sent;
            // Preparar la consulta parametrizada
            query = "\n        INSERT INTO usuarios (Nombre, Apellido, Dni, Email, Password)\n        VALUES (@Nombre, @Apellido, @Dni, @Email, @Password)";
            _context.next = 8;
            return (0, _connection.getConnection)();
          case 8:
            pool = _context.sent;
            request = pool.request(); // Agregar los parámetros de forma segura
            request.input("Nombre", validatedData.Nombre).input("Apellido", validatedData.Apellido).input("Dni", validatedData.Dni).input("Email", validatedData.Email).input("Password", hashedPassword);
            _context.next = 13;
            return request.query(query);
          case 13:
            res.status(201).json({
              error: 0,
              mensaje: "Los datos se grabaron con éxito"
            });
            _context.next = 23;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            if (!(_context.t0 instanceof _zod.z.ZodError)) {
              _context.next = 20;
              break;
            }
            return _context.abrupt("return", res.status(400).json({
              error: 1,
              mensaje: "Error de validación",
              detalles: _context.t0.errors.map(function (err) {
                return {
                  campo: err.path.join("."),
                  mensaje: err.message
                };
              })
            }));
          case 20:
            if (!(_context.t0.number === 2627)) {
              _context.next = 22;
              break;
            }
            return _context.abrupt("return", res.status(409).json({
              error: 1,
              mensaje: "Ya estas registrado"
            }));
          case 22:
            // Otros errores
            next(_context.t0);
          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function Register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.Register = Register;
var loginSchema = _zod.z.object({
  Email: _zod.z.string().email("Email inválido"),
  Password: _zod.z.string()
});
var Login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var validatedData, Email, Password, pool, result, user, isValidPassword, tokenPayload, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // Validar los datos de entrada
            validatedData = loginSchema.parse(req.body);
            Email = validatedData.Email, Password = validatedData.Password; // Preparar la consulta parametrizada
            _context2.next = 5;
            return (0, _connection.getConnection)();
          case 5:
            pool = _context2.sent;
            _context2.next = 8;
            return pool.request().input("email", _connection.sql.VarChar, Email).query("SELECT TOP(1) * FROM usuarios AS Us WHERE Us.Email = @email");
          case 8:
            result = _context2.sent;
            // Validar que el usuario exista
            user = result.recordset[0];
            if (user) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", res.status(401).json({
              error: 1,
              mensaje: "Usuario y/o Password son incorrectos o no Existen."
            }));
          case 12:
            _context2.next = 14;
            return _bcrypt["default"].compare(Password, user.Password);
          case 14:
            isValidPassword = _context2.sent;
            if (isValidPassword) {
              _context2.next = 17;
              break;
            }
            return _context2.abrupt("return", res.status(401).json({
              error: 1,
              mensaje: "Usuario y/o Password son incorrectos o no Existen."
            }));
          case 17:
            // Crear payload para el JWT con información mínima necesaria
            tokenPayload = {
              id: user.id,
              usuario: user.Usuario
            }; // Generar JWT
            token = _jsonwebtoken["default"].sign(tokenPayload, process.env.ClaveSecretaJWT, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
              algorithm: "HS256"
            }); // Establecer token en cookie
            // res.cookie("token", token, {
            //     httpOnly: false,
            //     secure: false,
            //     sameSite: "None",
            //     maxAge: 24 * 60 * 60 * 1000, // 24 horas
            // });
            // Establecer session en cookie
            // const userSession = {
            //     id: user.id,
            //     usuario: user.Usuario,
            //     email: user.Email,
            // };
            // res.cookie("session", userSession, {
            //     httpOnly: false,
            //     secure: false,
            //     sameSite: "None",
            //     maxAge: 24 * 60 * 60 * 1000, // 24 horas
            // });
            return _context2.abrupt("return", res.status(200).json({
              error: 0,
              mensaje: "Login Exitoso",
              // token,
              datos: {
                id: user.id,
                usuario: user.Usuario,
                email: user.Email,
                acceso: token
              }
            }));
          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](0);
            console.error("Error en login:", _context2.t0.message);

            // Manejar errores de validación de Zod
            if (!(_context2.t0 instanceof _zod.z.ZodError)) {
              _context2.next = 27;
              break;
            }
            return _context2.abrupt("return", res.status(400).json({
              error: 1,
              mensaje: "Error de validación",
              detalles: _context2.t0.errors.map(function (err) {
                return {
                  campo: err.path.join("."),
                  mensaje: err.message
                };
              })
            }));
          case 27:
            return _context2.abrupt("return", next(new Error("Error en la autenticación")));
          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 22]]);
  }));
  return function Login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// export const Logout = async (req, res, next) => {
//     res.clearCookie("token", { httpOnly: true, path: "/" });
//     res.clearCookie("session", { httpOnly: false, path: "/" });
//     res.send("Cookie eliminada");
// };
exports.Login = Login;