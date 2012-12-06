function Point(x,y) {
	this.x = x;
	this.y = y;
}

Point.prototype.distance = function(p) {
	return Math.sqrt((this.x-p.x)*(this.x-p.x)+(this.y-p.y)*(this.y-p.y));
}

module.exports = Point;