"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _SendEmail = _interopRequireDefault(require("./SendEmail"));

var _randomKey = _interopRequireDefault(require("./randomKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var forgotPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var email, re, validateEmail, token, mailOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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