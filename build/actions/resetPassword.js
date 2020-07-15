"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _users = _interopRequireDefault(require("../models/users"));

var resetPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, resetCode, validToken, validateEmail, hashedPassword;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password, resetCode = _req$body.resetCode;
            _context.next = 4;
            return _users["default"].findOne({
              resetCode: resetCode
            });

          case 4:
            validToken = _context.sent;

            if (validToken) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "wrong reset link"
            }));

          case 7:
            _context.next = 9;
            return _users["default"].findOne({
              "email": email
            });

          case 9:
            validateEmail = _context.sent;

            if (!validateEmail) {
              _context.next = 21;
              break;
            }

            _context.next = 13;
            return _bcryptjs["default"].hash(password, 12);

          case 13:
            hashedPassword = _context.sent;
            validateEmail.resetcode = "";
            validateEmail.password = hashedPassword;
            _context.next = 18;
            return validateEmail.save();

          case 18:
            return _context.abrupt("return", res.json({
              message: "Successfully Reset..."
            }));

          case 21:
            return _context.abrupt("return", res.json({
              message: "Wront Email!"
            }));

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.json({
              message: "Something went very wrong"
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
  }));

  return function resetPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = resetPassword;
exports["default"] = _default;