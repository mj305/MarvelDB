"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var privateKey = "!@#$%^&*()79452";

var me = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var authHeader, token, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authHeader = req.headers.authorization;

            if (!authHeader) {
              _context.next = 17;
              break;
            }

            token = authHeader.split("Bearer ")[1];

            if (!token) {
              _context.next = 14;
              break;
            }

            _context.prev = 4;
            user = _jsonwebtoken["default"].verify(token, privateKey);
            return _context.abrupt("return", res.json({
              message: user,
              auth: true
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", res.json({
              message: "you are not autenticated",
              auth: false
            }));

          case 12:
            _context.next = 15;
            break;

          case 14:
            return _context.abrupt("return", res.json({
              message: "wrong token",
              auth: false
            }));

          case 15:
            _context.next = 18;
            break;

          case 17:
            return _context.abrupt("return", res.json({
              message: "You are not logged in",
              auth: false
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 9]]);
  }));

  return function me(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = me;
exports["default"] = _default;