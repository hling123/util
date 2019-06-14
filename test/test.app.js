var app = require("../app");
var supertest = require("supertest");
var request = supertest(app);
var should = require("should");

describe("test/app.index.js", function() {
  it("sholud return 55 when n is 10", function(done) {
    request
      .get("/love")
      .query({ n: 10 })
      .end(function(err, res) {
        res.text.should.equal("55");
        done(err);
      });
  });
  it("sholud status 500 when n is 101", function(done) {
    request
      .get("/love")
      .query({ n: 101 })
      .end(function(err, res) {
        res.status.should.equal(500);
        done(err);
      });
  });
});
