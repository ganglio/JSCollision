if(!window.addEventListener)
		return;

function $$(expr, con) {
	return [].slice.call((con || document).querySelectorAll(expr));
}

function addClass(e, newClass) {
	var classes = e.className.split(" ");
	if (classes.indexOf(newClass) == -1)
		classes.push(newClass);
	e.className = classes.join(" ");
}

function removeClass(e, newClass) {
	var classes = e.className.split(" ");
	var index = classes.indexOf(newClass);
	if (index != -1)
		classes[index]="";
	e.className = classes.join(" ");
}


document.addEventListener('DOMContentLoaded', function (e) {
	var ball = $$(".object[data-shape=circle]")[0];
	var box = $$(".object[data-shape=box]")[0];

	var maxH = $$(".container")[0].offsetHeight;
	var maxW = $$(".container")[0].offsetWidth;

	ball.style.top = (maxH/2-ball.offsetHeight/2)+"px";
	ball.style.left = (maxW/2-ball.offsetWidth/2)+"px";
	var cnt=0;

	$$(".container")[0].addEventListener("drag",function(e){
		box.style.top = (e.y-box.offsetHeight/2)+"px";
		box.style.left = (e.x-box.offsetWidth/2)+"px";
		colliding = collision(".object").colliding();
		if (colliding.length==0)
			$$(".object").forEach(function(e){removeClass(e,"colliding");});
		else
			colliding.forEach(function(e){addClass(e,"colliding");});
	}, false);


}, false);
