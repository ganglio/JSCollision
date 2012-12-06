module.exports = {
	sqr: function(x) {
		return x * x;
	},

	dist: function(v, w) {
		return Math.sqrt(this.sqr(v.x - w.x) + this.sqr(v.y - w.y));
	}
};