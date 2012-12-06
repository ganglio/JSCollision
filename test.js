var Point = require("./lib/point");
var Box = require("./lib/box");
var Circle = require("./lib/circle");

p1 = new Point(0,0);
p2 = new Point(1,1);
c = new Circle(p1,0.5);

console.log(c.distance(p2));