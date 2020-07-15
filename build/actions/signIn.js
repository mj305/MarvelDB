"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var privateKey = "!@#$%^&*()79452";

var signIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, user, re, pwd, matchedPassword, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 4;
            return _users["default"].findOne({
              "email": email
            });

          case 4:
            user = _context.sent;

            if (!(email === "" || password === "")) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Email or Password missing."
            }));

          case 7:
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (email.match(re)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Ups... not a valid email"
            }));

          case 10:
            pwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

            if (password.match(pwd)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Minimum eight characters, at least one letter, one number and one special character"
            }));

          case 13:
            if (user) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "No account with that email... Please Sign Up!"
            }));

          case 15:
            _context.next = 17;
            return _bcryptjs["default"].compare(password, user.password);

          case 17:
            matchedPassword = _context.sent;

            if (matchedPassword) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Your PSWRD is FULL OF BS"
            }));

          case 22:
            token = _jsonwebtoken["default"].sign({
              email: user.email,
              name: user.name
            }, privateKey);
            console.log(token);
            return _context.abrupt("return", res.json({
              message: "You are In!",
              token: token
            }));

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.json({
              message: "Something went wrong!"
            }));

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 27]]);
  }));

  return function signIn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signIn;
exports["default"] = _default;