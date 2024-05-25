// console.log(arguments);
// console.log("module wrapper", require("module").wrapper);
const C1 = require("./test-module-1.js");
// const C2 = require("./test-module-2.js");
const calc1 = new C1();
console.log("calc 1 : ", calc1.add(2, 5));
console.log("calc 1 : ", calc1.multiply(2, 5));
console.log("calc 1 : ", calc1.divide(2, 5));
console.log("calc 1 : ", calc1.subtract(2, 5));
const calc2 = require("./test-module-2.js");
console.log("calc 2 : ", calc2.add(2, 5));
console.log("calc 2 : ", calc2.multiply(2, 5));
console.log("calc 2 : ", calc2.divide(2, 5));
console.log("calc 2 : ", calc2.subtract(2, 5));

//! object destructuring
const { add, multiply, divide, subtract } = require("./test-module-3.js");
console.log("calc 3 : ", add(2, 5));
console.log("calc 3 : ", multiply(2, 5));
console.log("calc 3 : ", divide(2, 5));
console.log("calc 3 : ", subtract(2, 5));

//! caching
require("./test-module-4.js")();
require("./test-module-4.js")();
require("./test-module-4.js")();
