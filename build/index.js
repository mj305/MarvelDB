"use strict";

require("dotenv/config");

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _forgotPassword = _interopRequireDefault(require("./actions/forgotPassword"));

var _resetPassword = _interopRequireDefault(require("./actions/resetPassword"));

var _signUp = _interopRequireDefault(require("./actions/signUp"));

var _users = _interopRequireDefault(require("./actions/users"));

var _signIn = _interopRequireDefault(require("./actions/signIn"));

var _me = _interopRequireDefault(require("./actions/me"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 4000;
app.use((0, _cors["default"])());

_mongoose["default"].connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.post('/forgotpassword', _forgotPassword["default"]);
app.post('/resetpassword', _resetPassword["default"]);
app.post('/signUp', _signUp["default"]);
app.post('/signIn', _signIn["default"]);
app.get('/users', _users["default"]);
app.get('/me', _me["default"]);
app.listen(port, function () {
  return console.log("Example app listening at http://localhost:".concat(port));
});