"use strict";

var jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = function (req, res, next) {
  try {
    var token = req.body.token; // const token = req.cookie.token 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing"
      });
    } // verify the token 


    try {
      var decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid"
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying token"
    });
  }
};

exports.isStudent = function (req, res, next) {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protect route for students you can not access it"
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role is not Matching"
    });
  }
};

exports.isAdmin = function (req, res, next) {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protect route for Admins,you can not access it"
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role is not Matching"
    });
  }
};
//# sourceMappingURL=auth.dev.js.map
