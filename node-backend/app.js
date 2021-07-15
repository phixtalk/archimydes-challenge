var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./api/routes/users");
const { response } = require("./api/middlewares/utils/response");
//const bodyParser = require("body-parser");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Archimydes Challenge API Documentation",
      version: "1.0.0",
    },
  },
  // apis: ["./api/routes/*.js"],
  apis: ["./docs/**/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//console.log(swaggerDocs);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(response(err.message));
  //res.render("error");
});

module.exports = app;
