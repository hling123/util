var Benchmark = require("benchmark");

var suite = new Benchmark.Suite();

var sum1 = function(number) {
  var sum = 0;
  for (var i = 0; i < number; i++) {
    sum += i;
  }
  return sum;
};

var sum2 = function(str) {
  var sum = 0;
  for (var i = 0; i < number; i++) {
    for (var j = 0; j < number; j++) {
      sum += i + j;
    }
  }
  return sum;
};

var number = 1000;

// add tests
suite
  .add("sum1", function() {
    sum1(number);
  })
  .add("sum2", function() {
    sum2(number);
  })

  .on("cycle", function(event) {
    console.log(JSON.stringify(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
