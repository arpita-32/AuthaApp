"use strict";

var bcrypt = require('bcrypt');

var User = require("../Models/User");

var jwt = require("jsonwebtoken");

require("dotenv").config(); // Sign up route handler


exports.signup = function _callee(req, res) {
  var _req$body, name, email, password, role, existingUser, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // get data
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role; // check if user already exist 

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "User Already Exists"
          }));

        case 7:
          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 10:
          hashedPassword = _context.sent;
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](7);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "Error in hashing password"
          }));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
          }));

        case 18:
          user = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: user
          }));

        case 22:
          _context.prev = 22;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later"
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22], [7, 13]]);
}; // Login


exports.login = function _callee2(req, res) {
  var _req$body2, email, password, user, payload, token, options;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Please fill all the details carefully"
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "User does not exist"
          }));

        case 9:
          // Verify password & generate a JWT token
          payload = {
            email: user.email,
            id: user._id,
            role: user.role
          };
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 12:
          if (!_context2.sent) {
            _context2.next = 21;
            break;
          }

          // password match
          token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h"
          });
          user = user.toObject();
          user.token = token;
          user.password = undefined;
          options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
          };
          res.cookie("token", token, options).status(200).json({
            success: true,
            token: token,
            user: user,
            message: "User logged in successfully"
          });
          _context2.next = 22;
          break;

        case 21:
          return _context2.abrupt("return", res.status(403).json({
            success: false,
            message: "Password does not match"
          }));

        case 22:
          _context2.next = 28;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Login false"
          }));

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
};
//# sourceMappingURL=Auth.dev.js.map
