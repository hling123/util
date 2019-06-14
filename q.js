var Q = require("q");
function getPromise(msg, timeout, opt) {
  var defer = Q.defer();
  setTimeout(function() {
    if (opt) {
      defer.reject(msg);
    } else {
      defer.resolve(msg);
    }
  }, timeout);
  return defer.promise;
}

getPromise("success", 1000)
  .then(function(e) {
    console.log(e);
    return getPromise("fall", 2000, "opt");
  })
  .then(function(e) {
    console.log(e);
    return getPromise("success", 3000);
  })
  .catch(function(e) {
    console.log(e);
  });
