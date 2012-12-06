math = require("./math");
Point = require("./point");

function Segment(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;
}

Segment.prototype.length = function() {
	return math.dist(this.p0,this.p1);
}

Segment.prototype.distance = function(p) {
	var l = this.length();
	if (l == 0) return math.dist(p, this.p0);
	var t = ((p.x - this.p0.x) * (this.p1.x - this.p0.x) + (p.y - this.p0.y) * (this.p1.y - this.p0.y)) / (l*l);
	if (t < 0) return math.dist(p, this.p0);
	if (t > 1) return math.dist(p, this.p1);
	return math.dist(p, { x: this.p0.x + t * (this.p1.x - this.p0.x), y: this.p0.y + t * (this.p1.y - this.p0.y) });
}

module.exports = Segment;