var fun = require("../mian.js");
var should = require("should");
var assert = require("assert");
var assert2 = require("chai").assert;
describe("test/mian.test.js", function() {
  assert2.typeOf("foo", "string");
  assert2.equal(3, 3);
  assert2.lengthOf("qwe", 3);
  before(function() {
    console.log("在这个区块内的所有测试之前运行");
  });
  after(function() {
    console.log("在这个区块内的所有测试之后运行");
  });
  beforeEach(function() {
    console.log("在这个区块内的每个测试运行之前运行");
  });
  afterEach(function() {
    console.log(" 在这个区块内的每个测试之后运行");
  });
  it("should equal 4 when 2 + 2", function() {
    fun.add(2, 2).should.equal(4);
  });
  it("should equal 3 when 1 + 2", function() {
    assert.equal(3, fun.add(1, 2));
  });
  it("should throw when n isnt Numbe", function() {
    (function() {
      fun.add(1, "q");
    }.should.throw("b should be a Number"));
  });
});
