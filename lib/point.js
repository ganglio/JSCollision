function Point(x,y) {
	this.x = x;
	this.y = y;
	this.type = "Point";
}

Point.prototype.distance = function(p) {
	switch (p.type) {
		case "Point":
			return Math.sqrt((this.x-p.x)*(this.x-p.x)+(this.y-p.y)*(this.y-p.y));
		case "Segment":
		case "Circle":
			return p.distance(this);
	}
	return false;
}

module.exports = Point;