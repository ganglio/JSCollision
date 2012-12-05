math = require("./math");

function Segment(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;
}

Segment.prototype.length = function() {
	return math.dist(this.p0,this.p1);
}

module.exports = Segment;