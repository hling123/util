// var connect = require("connect");
// var app = connect()
//   .use(connect.logger("dev"))
//   .use(function(req, res) {
//     res.end("hello world\n");
//   })
//   .listen(3000);
// var connect = require("connect");
// var app = connect()
//   .use(connect.logger("dev"))
//   .use(function(req, res) {
//     res.sent("hello connect");
//   })
//   .listen(3000);
// const log4js = require("log4js");
// log4js.configure({
//   appenders: {
//     out: { type: "stdout" },
//     app: { type: "file", filename: "application.log" }
//   },
//   categories: {
//     default: { appenders: ["out", "app"], level: "debug" }
//   }
// });
const log4js = require("log4js");
const logger2 = require("morgan");
log4js.configure({
  appenders: {
    everything: { type: "file", filename: "all-the-logs.log" }
  },
  categories: {
    default: { appenders: ["everything"], level: "trace" }
  }
});

const logger = log4js.getLogger();
logger.debug("I will be logged in all-the-logs.log");

var connect = require("connect");
var app = connect()
  .use(logger2())
  .use(function(req, res) {
    res.end("hello world\n");
  })
  .listen(3000);
