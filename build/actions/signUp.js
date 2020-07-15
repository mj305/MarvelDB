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

var _SendEmail = _interopRequireDefault(require("./SendEmail"));

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, email, password, re, validateEmail, pwd, hashedPassword, newUser, result, mailOptions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

            if (!(name === "")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Ups... need to enter a name"
            }));

          case 4:
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (email.match(re)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Ups... not a valid email"
            }));

          case 7:
            _context.next = 9;
            return _users["default"].findOne({
              "email": email
            });

          case 9:
            validateEmail = _context.sent;

            if (!validateEmail) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Email exists!"
            }));

          case 12:
            pwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

            if (password.match(pwd)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Minimum eight characters, at least one letter, one number and one special character"
            }));

          case 15:
            _context.next = 17;
            return _bcryptjs["default"].hash(password, 12);

          case 17:
            hashedPassword = _context.sent;
            newUser = new _users["default"]({
              name: name,
              email: email,
              password: hashedPassword
            });
            _context.next = 21;
            return newUser.save();

          case 21:
            result = _context.sent;

            if (!result) {
              _context.next = 28;
              break;
            }

            mailOptions = {
              from: 'marvelcomicsreactapp@gmail.com',
              to: email,
              subject: 'Welcome!',
              text: 'We are so excited to have you and be part of the community...'
            };

            _SendEmail["default"].sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

            return _context.abrupt("return", res.json({
              message: "Success... You're all Set"
            }));

          case 28:
            return _context.abrupt("return", res.json({
              message: "Ups"
            }));

          case 29:
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.json({
              message: _context.t0
            }));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 31]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signUp;
exports["default"] = _default;