"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var sendEmail = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MARVEL_EMAIL,
    pass: process.env.MARVEL_PASSWORD // naturally, replace both with your real credentials or an application-specific password

  }
});

var _default = sendEmail;
exports["default"] = _default;