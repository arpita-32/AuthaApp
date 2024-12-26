"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../Controllers/Auth"),
    login = _require.login,
    signup = _require.signup;

router.post("/login", login);
router.post("/signup", signup);
module.exports = router;
//# sourceMappingURL=user.dev.js.map
