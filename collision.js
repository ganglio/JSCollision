;(function(window,document,undefined){
	"use strict";

	/**
	 * Initialize collision detection on a group of elements
	 * @param  {String}      selector   A selector describing the objects to check for collisions
	 * @param  {HTMLElement} container  An optional container to quicken the search
	 * @return {object}                 self (handy for chaining)
	 */
	var self = window.collision = function(selector,container) {
		self.elements = $$(selector,container);

		/**
		 * Test if the two objects collide
		 * @param  {object}  o0  The first object
		 * @param  {object}  o1  The second object
		 * @return {boolean}     True if the objects collide
		 */
		window.collision.test_collision = function(o0,o1) {
			if (o0.shape=="box" && o1.shape=="box") {
				var test = !( o0.p1.y < o1.p0.y || o0.p0.y > o1.p1.y || o0.p1.x < o1.p0.x || o0.p0.x > o1.p1.x )
			} else if (o0.shape=="circle" && o1.shape=="circle") {
				var test = Math.sqrt((o0.c.x-o1.c.x)*(o0.c.x-o1.c.x)+(o0.c.y-o1.c.y)*(o0.c.y-o1.c.y))<(o0.r+o1.r);
			} else if (o0.shape=="circle" && o1.shape=="box") {
				var test = distToSegment(o0.c,o1.p0,{x:o1.p1.x,y:o1.p0.y})<o0.r ||
				           distToSegment(o0.c,o1.p0,{x:o1.p0.x,y:o1.p1.y})<o0.r ||
				           distToSegment(o0.c,o1.p1,{x:o1.p1.x,y:o1.p0.y})<o0.r ||
				           distToSegment(o0.c,o1.p1,{x:o1.p0.x,y:o1.p1.y})<o0.r;
			} else return false;
			return test;
		}

		/**
		 * Calculates the square of the parameter
		 * @param  {number} x A number
		 * @return {number}   x*x
		 */
		function sqr(x) {
			return x * x;
		}

		/**
		 * Calculates the squared distance between two points
		 * @param  {Point}  v  The first point
		 * @param  {Point}  w  The second point
		 * @return {Number}    The squared distance
		 */
		function dist(v, w) {
			return Math.sqrt(sqr(v.x - w.x) + sqr(v.y - w.y));
		}

		/**
		 * Calculates the distance between a point p and a segment vw
		 * @param  {Point}  p Point to check
		 * @param  {Point}  v Segmenbt vertex
		 * @param  {Point}  w Segment vertex
		 * @return {Number}   The distance between the segment and the point
		 */
		function distToSegment(p, v, w) {
			var l = dist(v, w);
			if (l == 0) return dist(p, v);
			var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / (l*l);
			if (t < 0) return dist(p, v);
			if (t > 1) return dist(p, w);
			return dist(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
		}

		self.elements.forEach(function(element){
			switch (element.dataset["shape"]) {
				case "circle":
					element.data = {
						c: { x: element.offsetLeft + element.offsetWidth/2, y: element.offsetTop +  element.offsetHeight/2},
						r: element.offsetWidth/2,
						shape: "circle"
					};
				break;

				default:
					element.data = {
						p0: { x: element.offsetLeft,                       y: element.offsetTop },
						p1: { x: element.offsetLeft + element.offsetWidth, y: element.offsetTop +  element.offsetHeight},
						shape: "box"
					};
				break;
			}
		});
		return self;
	}

	/**
	 * Checks if there is any collision among the objects selected
	 * @return {Array}  A list of colliding objects
	 */
	window.collision.colliding = function() {
		var colliding = [];
		self.elements.forEach(function(current_element){
			var current_data = current_element.data;
			self.elements.forEach(function(test_element){
				var test_data = test_element.data;
				if (test_element!=current_element) {
					var collision_test = self.test_collision(test_data,current_data);
					if (collision_test)
						if (colliding.indexOf(current_element)==-1)
							colliding.push(current_element);
				}
			});
		});
		return colliding;
	}

	/**
	 * Simple and dirty query selector alla Sizzle (but simpler)
	 * @param  {String}       expr  The actual selector
	 * @param  {HTMLElement}  con   An optional container to quicken the selection
	 * @return {Array}              An array of selected elements
	 */
	function $$(expr, con) {
		return [].slice.call((con || document).querySelectorAll(expr));
	}
})(window, document);