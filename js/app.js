/*
* app.js for the toy-gnome / gestures project...
*/

// load four images for the toy gnome's states
var happy = new Image();
happy.src = "./img/gnome-happy.jpg";

var mad = new Image();
mad.src = "./img/gnome-mad.jpg";

var left = new Image();
left.src = "./img/gnome-left.jpg";

var right = new Image();
right.src = "./img/gnome-right.jpg";

var start = new Image();
start.src = "./img/gnome.jpg";


var States = {
	start : function(){
		console.log("toy gnome start state...");
		document.getElementById("gnome").src = start.src;		
	},
	angry : function(){
		console.log("toy gnome is mad...");
		document.getElementById("gnome").src = mad.src;
	},
	happy : function(){
		console.log("toy gnome is happy...");
		document.getElementById("gnome").src = happy.src;		
	},
	lookLeft : function(){
		console.log("look left:");
		document.getElementById("gnome").src = left.src;
	},
	lookRight : function(){
		console.log("look right:");
		document.getElementById("gnome").src = right.src;
	}
};

// Evt object will hold our event functions:
var Evt = {
	mouseIsDown : false,
	clickX : null,
	clickY : null,
	releaseX : null,
	releaseY : null,

	onMouseMove : function(evt) {'use strict';
		evt.preventDefault();
	},

	onMouseStart : function(e) {'use strict';
		e.preventDefault();

		if (e.changedTouches && e.changedTouches.length > 0) {
			this.clickX = e.changedTouches[0].pageX;
			this.clickY = e.changedTouches[0].pageY;
		} else {
			this.clickX = e.pageX;
			this.clickY = e.pageY;
		}

		this.mouseIsDown = true;
	},

	onMouseEnd : function(e) {'use strict';
		e.preventDefault();
		this.mouseIsDown = false;

		if (e.changedTouches && e.changedTouches.length > 0) {
			this.releaseX = e.changedTouches[0].pageX;
			this.releaseY = e.changedTouches[0].pageY;
		} else {
			this.releaseX = e.pageX;
			this.releaseY = e.pageY;
		}

		var xOry = (Math.abs(this.releaseX - this.clickX) > Math.abs(this.releaseY - this.clickY)) ? "x" : "y";
		console.log(xOry);

		switch (xOry) {
			case 'x':
				if (this.releaseX - this.clickX > 0) {
					States.lookLeft();
				} else {
					States.lookRight();
				}
				break;

			case 'y':

				if (this.releaseY - this.clickY <= 0) {
					States.happy();
				} else {
					States.angry();
				}
				break;
		}

	},

	KeyCheck : function(event) {'use strict';

		var KeyID = event.keyCode;

		if (KeyID === 39) {
			// right arrow
			States.lookRight();
			
		} else if (KeyID === 37) {
			// left arrow
			States.lookLeft();
			
		} else if (KeyID === 38) {
			// up arrow
			States.happy();
			
		} else if (KeyID === 40) {
			// down arrow
			States.angry();

		} else if (KeyID === 32) {
			// space bar
			
		} else {
			// any other key
			States.start();
			
		}
	}
};

// event listeners....
window.addEventListener("load", function() {
	States.start();
}, false);

window.addEventListener('keydown', Evt.KeyCheck, true);

document.body.addEventListener('mousemove', Evt.onMouseMove, false);
document.body.addEventListener('mousedown', Evt.onMouseStart, false);
document.body.addEventListener('mouseup', Evt.onMouseEnd, false);

document.body.addEventListener('touchmove', Evt.onMouseMove, false);
document.body.addEventListener('touchstart', Evt.onMouseStart, false);
document.body.addEventListener('touchend', Evt.onMouseEnd, false);
