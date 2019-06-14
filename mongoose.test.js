var mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017`);
mongoose.connection.on("connected", function() {
  console.log("数据库连接成功");
});

mongoose.connection.on("error", function(err) {
  console.log("数据库连接出现错误，错误为：" + err);
});

mongoose.connection.on("disconnected", function() {
  console.log("数据库连接断开");
});

mongoose.connect("mongodb://localhost/test");
var Cat = mongoose.model("Cat", {
  name: String,
  friends: [String],
  age: Number
});
var kitty = new Cat({ name: "Zildjian", friends: ["tom", "jerry"] });
kitty.age = 3;

// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
kitty.save(function(err) {
  if (err)
    // ...
    console.log("meow");
});
