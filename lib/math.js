module.exports = {
	/**
	 * Calculates the square of the parameter
	 * @param  {number} x A number
	 * @return {number}   x*x
	 */
	sqr: function(x) {
		return x * x;
	},

	/**
	 * Calculates the squared distance between two points
	 * @param  {Point}  v  The first point
	 * @param  {Point}  w  The second point
	 * @return {Number}    The squared distance
	 */
	dist: function(v, w) {
		return Math.sqrt(this.sqr(v.x - w.x) + this.sqr(v.y - w.y));
	},

	/**
	 * Calculates the distance between a point p and a segment vw
	 * @param  {Point}  p Point to check
	 * @param  {Point}  v Segmenbt vertex
	 * @param  {Point}  w Segment vertex
	 * @return {Number}   The distance between the segment and the point
	 */
	distToSegment: function(p, v, w) {
		var l = this.dist(v, w);
		if (l == 0) return this.dist(p, v);
		var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / (l*l);
		if (t < 0) return this.dist(p, v);
		if (t > 1) return this.dist(p, w);
		return this.dist(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
	}
};