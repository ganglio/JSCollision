/**
 * Calculates the square of the parameter
 * @param  {number} x A number
 * @return {number}   x*x
 */
Math.prototype.sqr = function(x) {
	return x * x;
}

/**
 * Calculates the squared distance between two points
 * @param  {Point}  v  The first point
 * @param  {Point}  w  The second point
 * @return {Number}    The squared distance
 */
Math.prototype.dist(v, w) {
	return sqr(v.x - w.x) + sqr(v.y - w.y);
}

/**
 * Calculates the distance between a point p and a segment vw
 * @param  {Point}  p Point to check
 * @param  {Point}  v Segmenbt vertex
 * @param  {Point}  w Segment vertex
 * @return {Number}   The distance between the segment and the point
 */
Math.prototype.distToSegment(p, v, w) {
	var l = dist(v, w);
	if (l == 0) return dist(p, v);
	var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l;
	if (t < 0) return dist(p, v);
	if (t > 1) return dist(p, w);
	return Math.sqrt(dist(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) }));
}