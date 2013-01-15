var Point = require("../lib/point");
var Segment = require("../lib/segment");
var Box = require("../lib/box");
var Circle = require("../lib/circle");

module.exports = {
	'test Point-to-Point#distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2),
			new Point(0,0).distance(new Point(1,1))
		);
	},
	'test Point-to-Segment#distance': function(beforeExit, assert) {
		assert.equal(
			1,
			new Segment(
				new Point(-1,0),
				new Point(1,0)
			).distance(new Point(0,1))
		);
	}
};