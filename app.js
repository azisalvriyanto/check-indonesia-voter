const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const { normalizePort } = require("./utils/helpers.js");
const app = express();
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);
app.set("host", "0.0.0.0");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use(function (request, response, next) {
  response.status(404);

  return response.json({
    meta: {
      success: false,
      code: 404,
      message: "Page not found",
      errors: [],
    },
    data: null,
  });
});

app.use(function (error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  response.status(error.status || 500);

  return response.json({
    meta: {
      success: false,
      code: error.status || 500,
      message: error.message,
      errors: response.locals.error,
    },
    data: null,
  });
});

module.exports = app;
