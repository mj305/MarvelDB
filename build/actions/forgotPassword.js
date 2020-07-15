"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _users = _interopRequireDefault(require("../models/users"));

var _SendEmail = _interopRequireDefault(require("./SendEmail"));

var _randomKey = _interopRequireDefault(require("./randomKey"));

var forgotPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, re, validateEmail, token, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            email = req.body.email;
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (email.match(re)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Ups... not a valid email"
            }));

          case 5:
            _context.next = 7;
            return _users["default"].findOne({
              "email": email
            });

          case 7:
            validateEmail = _context.sent;
            console.log(validateEmail);

            if (!validateEmail) {
              _context.next = 18;
              break;
            }

            token = (0, _randomKey["default"])(5);
            validateEmail.resetCode = token;
            _context.next = 14;
            return validateEmail.save();

          case 14:
            mailOptions = {
              from: 'marvelcomicsreactapp@gmail.com',
              to: email,
              subject: 'Password Reset!',
              html: "<p>You are reseting your password</p><a href=\"".concat(process.env.APP_URL, "/resetpassword/").concat(token, "/").concat(validateEmail.email, "\"> Click Here... </a>")
            };

            _SendEmail["default"].sendMail(mailOptions, function (error, info) {
              if (error) {
                return res.json({
                  message: "Can't send email, submit again..."
                });
              } else {
                return res.json({
                  message: "Email sent, check your inbox..."
                });
              }
            });

            _context.next = 19;
            break;

          case 18:
            return _context.abrupt("return", res.json({
              message: "Email doesn't exist!"
            }));

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.json({
              message: "Something went very wrong"
            }));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function forgotPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = forgotPassword;
exports["default"] = _default;