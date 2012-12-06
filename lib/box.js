Point = require("./point");
Segment = require("./segment");

function Box(p0,p1) {
	this.p0 = p0;
	this.p1 = p1;

	this.sides=[
		new Segment(p0,new Point(p1.x,p0.y)),
		new Segment(p0,new Point(p0.x,p1.y)),
		new Segment(p1,new Point(p1.x,p0.y)),
		new Segment(p1,new Point(p0.x,p1.y))
	];
}

Box.prototype.distance = function(p) {
	return this.sides.reduce(function(a,b){
		return Math.min(a,b.distance(p));
	});
}

module.exports = Segment;