function add(a, b) {
  if (typeof b !== "number") {
    throw new Error("b should be a Number");
  }
  return a + b;
}
exports.add = add;

if (require.main === module) {
  //When a file is run directly from Node, require.main is set to its module.
  console.log("add(" + 1, +6 + ") is", add(1, 6));
}
