var Point = require("../lib/point");
var Segment = require("../lib/segment");
var Box = require("../lib/box");
var Circle = require("../lib/circle");

module.exports = {
	// Test distances from Point to all
	'test Point-to-Point distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2),
			new Point(0,0).distance(new Point(1,1))
		);
	},
	'test Point-to-Segment distance': function(beforeExit, assert) {
		assert.equal(
			1,
			new Segment(
				new Point(-1,0),
				new Point(1,0)
			).distance(new Point(0,1))
		);
	},
	'test Point-to-Circle distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2)-1,
			new Circle(
				new Point(1,1),
				1
			).distance(new Point(0,0))
		);
	},

	// Test distance from Segment to all
	'test Segment-to-Segment distance': function(beforeExit, assert) {
		assert.equal(
			1,
			new Segment(
				new Point(0,0),
				new Point(0,1)
			).distance(new Segment(
				new Point(1,0),
				new Point(2,1)
			))
		);
	},
	'test Segment-to-Point distance': function(beforeExit, assert) {
		assert.equal(
			1,
			new Point(0,1).distance(
				new Segment(
					new Point(-1,0),
					new Point(1,0)
				))
		);
	},
	'test Segment-to-Circle distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2)-1,
			new Segment(
				new Point(-1,1),
				new Point(1,-1)
			).distance(new Circle(
				new Point(1,1),
				1
			))
		);
	},

	// Test distance from Circle to all
	'test Circle-to-Circle distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(18)-2,
			new Circle(
				new Point(0,0),
				1
			).distance(
				new Circle(
					new Point(3,3),
					1
				)
			)
		);
	},
	'test Circle-to-Point distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2)-1,
			new Point(0,0).distance(
				new Circle(
					new Point(1,1),
					1
				))
		);
	},
	'test Circle-to-Segment distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2)-1,
			new Circle(
				new Point(1,1),
				1
			).distance(new Segment(
				new Point(-1,1),
				new Point(1,-1)
			))
		);
	},

	// Test distance from Box to all
	'test Box-to-Box distance': function(beforeExit, assert) {
		assert.equal(
			Math.sqrt(2),
			new Box(
				new Point(0,0),
				new Point(1,1)
			).distance(
				new Box(
					new Point(2,2),
					new Point(3,3)
				)
			)
		);
	}
};