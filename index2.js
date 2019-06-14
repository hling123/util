var eventproxy = require("eventproxy");
var express = require("express");
var cheerio = require("cheerio");
var superagent = require("superagent");
var url = require("url");
var app = express();
var commitUrl = "https://cnodejs.org/";
app.get("/", function(err, endres) {
  superagent.get(commitUrl).end(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      var picUrls = [];
      var $ = cheerio.load(res.text);
      $("#topic_list .topic_title").each(function(index, element) {
        var $el = $(element);
        var hrefurl = url.resolve(commitUrl, $el.attr("href"));
        picUrls.push(hrefurl);
      });
      endres.send(picUrls);
      var ep = new eventproxy();
      ep.after("picUrls", picUrls.length, function(arr) {
        console.log(arr);
        var datas = arr.map(function(item) {
          var url = item[0];
          var htm = item[1];
          var $ = cheerio.load(htm);
          return {
            title: $(".topic_full_title")
              .text()
              .trim(),
            com: $(".reply_content")
              .eq(0)
              .text()
              .trim(),
            url: url
          };
        });
      });
      picUrls.forEach(function(item) {
        superagent.get(item).end(function(err, res) {
          if (err) {
            console.log(err);
          } else {
            ep.emit("picUrls", [item, res.text]);
          }
        });
      });
    }
  });
});
app.listen(8080, function() {
  console.log("go");
});
