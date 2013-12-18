
var mouseIsDown = false;
var clickX;
var clickY;
var releaseX;
var releaseY;

var happy = new Image();
happy.src = "./img/gnome-happy.jpg";

var mad = new Image();
mad.src = "./img/gnome-mad.jpg";

var left = new Image();
left.src = "./img/gnome-left.jpg";

var right = new Image();
right.src = "./img/gnome-right.jpg";

var Evt = {
	
};

function onMouseMove(evt) {
    'use strict';
    evt.preventDefault();
}

function onMouseStart(e) {
    'use strict';
    e.preventDefault();
    //console.log('hhh');

    if (e.changedTouches && e.changedTouches.length > 0) {
        clickX = e.changedTouches[0].pageX;
        clickY = e.changedTouches[0].pageY;
    } else {
        clickX = e.pageX;
        clickY = e.pageY;
    }

    mouseIsDown = true;
}

function onMouseEnd(e) {
    'use strict';
    e.preventDefault();
    mouseIsDown = false;

    if (e.changedTouches && e.changedTouches.length > 0) {
        releaseX = e.changedTouches[0].pageX;
        releaseY = e.changedTouches[0].pageY;
     } else {
        releaseX = e.pageX;
        releaseY = e.pageY; 
    }   
        
    var xOry = (Math.abs(releaseX-clickX)>Math.abs(releaseY-clickY)) ? "x" : "y";
    console.log(xOry);
    
    switch (xOry) {
    	case 'x':
    		if(releaseX-clickX > 0) {
    			// increment
    			console.log("look left:");
    			document.getElementById("gnome").src = left.src;
				//reDraw();
	    	}
    		else {
    			// decrement
    			console.log("look right:");
    			document.getElementById("gnome").src = right.src;
				//reDraw();
    		}
    	break;
    	
    	case 'y':
    	
    		if(releaseY-clickY <= 0) {
    			
    			console.log("toy gnome is happy...");
    			document.getElementById("gnome").src = happy.src;
    		} else {
    			
    			console.log("toy gnome is mad...");
    			document.getElementById("gnome").src = mad.src;
    		}
    	break;
    }
    
}	


window.addEventListener("load",function(){
	reDraw();
},false);

function reDraw(callback) {
	// var item = vocab[level];
	// document.getElementById('content').innerHTML = item.words[subIndex];
	// document.getElementById('level').innerHTML = "Level:" + (level+1) + " use &uarr; &rarr; &darr; &larr;";

	if(callback) {
		callback();
	}
}

function KeyCheck(event) {
    'use strict';
    
    var KeyID = event.keyCode;

    if (KeyID === 39) {
        console.log('right');
        reDraw();
    } else if (KeyID === 37) {
        console.log('left'); 
        reDraw();
    }  else if (KeyID === 38) {
        console.log('up'); 
        reDraw();
    } else if (KeyID === 40) {
        console.log('down'); 
        reDraw();

    } else if(KeyID === 32) {
    	//reDraw(playSound);
    } else {
    	//console.log(KeyID);
    }
}
	
	window.addEventListener('keydown',KeyCheck,true);  
	
	document.body.addEventListener('mousemove', onMouseMove, false);
	document.body.addEventListener('mousedown', onMouseStart, false);
	document.body.addEventListener('mouseup', onMouseEnd, false);
	
	document.body.addEventListener('touchmove', onMouseMove, false);
	document.body.addEventListener('touchstart', onMouseStart, false);
	document.body.addEventListener('touchend', onMouseEnd, false);	