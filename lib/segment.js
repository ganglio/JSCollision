Point = require("./point");

function Segment(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;
	this.type = "Segment";
}

Segment.prototype.length = function() {
	return this.p0.distance(this.p1);
}

Segment.prototype.distance = function(p) {
	switch (p.type) {
		case "Point":
			var l = this.length();
			if (l == 0) return p.distance(this.p0);
			var t = ((p.x - this.p0.x) * (this.p1.x - this.p0.x) + (p.y - this.p0.y) * (this.p1.y - this.p0.y)) / (l*l);
			if (t < 0) return p.distance(this.p0);
			if (t > 1) return p.distance(this.p1);
			return p.distance(new Point(this.p0.x + t * (this.p1.x - this.p0.x), this.p0.y + t * (this.p1.y - this.p0.y)));

		case "Circle":
			return p.distance(this);

		case "Segment":
			return Math.min(this.p0.distance(p),this.p1.distance(p));
	}
	return false;
}

module.exports = Segment;