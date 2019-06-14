var express = require("express");
var cheerio = require("cheerio");
var superagent = require("superagent");
var cookieParser = require("cookie-parser");
var app = express();
app.use(cookieParser);

// app.get('/', function (req, res, next) {
//   superagent.get('https://cnodejs.org/')
//     .end(function (err, sres) {
//       if (err) {
//         return next(err);
//       }
//       var $ = cheerio.load(sres.text);
//       var items = [];

//       $('#topic_list .topic_title').each(function (idx, element) {
//         var $element = $(element);
//         console.log($element.attr('title'))
//         items.push({
//           title: $element.attr('title'),
//           href: $element.attr('href')
//         });
//       });

//       res.send(items);
//     });
// });

app.get("/", (req, res, next) => {
  //res.cookie("ysh", 1, { maxAge: 6 * 1000 });
  res.send("第一次访问");

  // superagent.get("https://cnodejs.org/getstart").end(function(err, sres) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   var $ = cheerio.load(sres.text);
  //   var arr = [];
  //   $("#content a").each(function(idx, element) {
  //     var $element = $(element);

  //     console.log($element.html());
  //     arr.push({
  //       href: $element.attr("href"),
  //       title: decodeURIComponent($element.html())
  //     });
  //   });
  //   // var $=cheerio.load('<div class="container"></div>');
  //   // var container=$('.container');
  //   // for(var i=0;i<10;i++){
  //   // var item=$('<div />');
  //   // item.addClass('item');
  //   // item.text(i);
  //   // container.append(item);
  //   // }
  //   // console.info($.html());
  //   //res.send(arr);
  // });
});

// var mysql = require('mysql');
// var connection= mysql.createConnection({
// host:'192.168.0.130',
// user:'root',
// password:'admin-123456',
// port:3306,
// database:'cg_test'
// });

// connection.connect(function(err){
// if(err){
// console.log("链接失败");
// throw(err)
// }else{
// console.log("链接成功");
// /*connection.query("CREATE TABLE person(id int,user varchar(255),password varchar(255))", function(err,result){
// if(err){throw err}else{
// console.log("创建表成功")
// }
// })*/
// }
// })
// var  sql = 'SELECT * FROM cg_staff';
// //查
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }

//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');
// });

// connection.end();
// app.get('/',(req,res)=>{
// 	res.send('hello ysh')
// });
module.exports = app;
app.listen(1234, function() {
  console.log("over");
});
// console.log(process.env);
