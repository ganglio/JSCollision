Point = require("./point");
Segment = require("./segment");

function Box(p0,p1) {
	this.sides = [
		new Segment(p0,new Point(p1.x,p0.y)),
		new Segment(p0,new Point(p0.x,p1.y)),
		new Segment(p1,new Point(p1.x,p0.y)),
		new Segment(p1,new Point(p0.x,p1.y))
	];
}

Box.prototype.distance = function(p) {
	switch (p.type) {
		case "Point":
			return Math.min.apply(
				Math,
				this.sides.map(function(side){
					return side.distance(p);
				})
			);
	}
}

module.exports = Box;