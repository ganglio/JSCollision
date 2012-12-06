var Point = require("./lib/point");
var Box = require("./lib/box");
var math = require("./lib/math");

o = new Point(0,0);
p0 = new Point(2,1);
p1 = new Point(3,2);
b = new Box(p0,p1);

console.log(b.distance(o));