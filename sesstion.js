var express = require("express");
// 首先引入 express-session 这个模块
var session = require("express-session");

var app = express();
app.listen(5000);

// 按照上面的解释，设置 session 的可选参数
app.use(
  session({
    secret: "recommand 128 bytes random string", // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000 }
  })
);

app.get("/", function(req, res) {
  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if (req.session.isVisit) {
    req.session.isVisit++;
    res.send("<p>第 " + req.session.isVisit + "次来此页面</p>");
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
});

// var express = require("express");
// var session = require("express-session");
// var redisStore = require("connect-redis")(session);

// var app = express();
// app.listen(5000);

// app.use(
//   session({
//     // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
//     // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
//     // 编写自己的 store 也很简单
//     store: new redisStore(),
//     secret: "somesecrettoken"
//   })
// );

// app.get("/", function(req, res) {
//   if (req.session.isVisit) {
//     req.session.isVisit++;
//     res.send("<p>第 " + req.session.isVisit + "次来到此页面</p>");
//   } else {
//     req.session.isVisit = 1;
//     res.send("欢迎第一次来这里");
//   }
// });
