Point = require("./point");

function Circle(c,r) {
	this.c = c;
	this.r = r;
}

Circle.prototype.distance = function(p) {
	return this.c.distance(p)-this.r;
}

module.exports = Circle;