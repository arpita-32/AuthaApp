"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../Controllers/Auth"),
    login = _require.login,
    signup = _require.signup;

var _require2 = require("../middleware/auth"),
    auth = _require2.auth,
    isStudent = _require2.isStudent,
    isAdmin = _require2.isAdmin;

router.post("/login", login);
router.post("/signup", signup);
router.get("/test", auth, function (req, res) {
  res.json({
    success: true,
    message: "Welcome to the protected route for Tests"
  });
});
router.get("/student", auth, isStudent, function (req, res) {
  res.json({
    success: true,
    message: "Welcome to the protected route for students"
  });
});
router.get("/admin", auth, isAdmin, function (req, res) {
  res.json({
    success: true,
    message: "Welcome to the protected route for Admin"
  });
});
module.exports = router;
//# sourceMappingURL=user.dev.js.map
