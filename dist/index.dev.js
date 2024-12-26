"use strict";

var express = require("express");

var app = express();

require('dotenv').config();

var PORT = process.env.PORT || 4000;
app.use(express.json());

require("./config/database").connect();

var user = require("./routes/user");

app.use("/api/v1", user);
app.listen(PORT, function () {
  console.log("App is listening at ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
