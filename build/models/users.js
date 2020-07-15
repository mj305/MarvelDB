"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  resetCode: String,
  password: String
});

var _default = (0, _mongoose.model)("user", userSchema);
/* 
Name: 
email: (also used as username)
password: 
*/


exports["default"] = _default;