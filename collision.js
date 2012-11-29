;(function(window,document,undefined){

	var self = window.collision = function(selector,container) {
		self.elements = $$(selector,container);

		window.collision.test_collision = function(o0,o1) {
			if (o0.shape=="box" && o1.shape=="box") {
				test = !( o0.p1.y < o1.p0.y || o0.p0.y > o1.p1.y || o0.p1.x < o1.p0.x || o0.p0.x > o1.p1.x )
			} else if (o0.shape=="circle" && o1.shape=="circle") {
				test = Math.sqrt((o0.c.x-o1.c.x)*(o0.c.x-o1.c.x)+(o0.c.y-o1.c.y)*(o0.c.y-o1.c.y))<(o0.r+o1.r);
			} else if (o0.shape=="circle" && o1.shape=="box") {
				test = inCircle(o0.c,o0.r,o1.p0) ||
				       inCircle(o0.c,o0.r,o1.p1) ||
				       inCircle(o0.c,o0.r,{x:o1.p1.x,y:o1.p0.y}) ||
				       inCircle(o0.c,o0.r,{x:o1.p0.x,y:o1.p1.y}) ||
				       inBox(o1.p0,o1.p1,o0.c);
				//test = !(o0.c.x+o0.r<o1.p0.x || o0.c.x-o0.r>o1.p1.x || o0.c.y+o0.r<o1.p0.y || o0.c.y-o0.r>o1.p1.y);
			} else return false; /* if (o0.shape=="box" && o1.shape=="circle") {
				test = !(o1.c.x+o1.r<o0.p0.x || o1.c.x-o1.r>o0.p1.x || o1.c.y+o1.r<o0.p0.y || o1.c.y-o1.r>o0.p1.y);
			}//*/
			return test;
		}

		function inCircle(c,r,p) {
			return Math.sqrt((c.x-p.x)*(c.x-p.x)+(c.y-p.y)*(c.y-p.y))<r;
		}

		function inBox(p1,p2,p3) {
			return p3.x>p1.x && p3.x<p2.x && p3.y>p1.y && p3.y<p2.y;
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

	function $$(expr, con) {
		return [].slice.call((con || document).querySelectorAll(expr));
	}
})(window, document);