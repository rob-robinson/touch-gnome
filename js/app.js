var EventHandlers = {
	mouseIsDown : false, 
	clickX : null, 
	clickY : null, 
	releaseX : null, 
	releaseY : null, 
	onMouseEnd:function(e) {
		// basically setting globals clickY and clickX to where click or touch event ended...:
		var newKey;

		if (e.changedTouches && e.changedTouches.length > 0) {
			EventHandlers.releaseX = e.changedTouches[0].pageX;
			EventHandlers.releaseY = e.changedTouches[0].pageY;

			// determine greatest swipe directional velocity:
			var xOry = (Math.abs(EventHandlers.releaseX - EventHandlers.clickX) > Math.abs(EventHandlers.releaseY - EventHandlers.clickY)) ? "x" : "y";

			switch (xOry) {

				case 'x':
					if (Math.abs(EventHandlers.releaseX - EventHandlers.clickX) > 80) {
						if (EventHandlers.releaseX - EventHandlers.clickX > 0) {// moved x in a positive way
							// show menu...
							EventHandlers.moveCenterItemHorizontally("left");
						} else {// moved x in a nagative way
							// show settings
							EventHandlers.moveCenterItemHorizontally("right");
						}
					}
					break;
			} // end case 'x'
		} else {
			EventHandlers.releaseX = e.pageX;
			EventHandlers.releaseY = e.pageY;
		}
	}, 
	onMouseStart	: function(e) {
		// basically setting globals clickY and clickX to where click or touch event started...:
		if (e.changedTouches && e.changedTouches.length > 0) {
			EventHandlers.clickX = e.changedTouches[0].pageX;
			EventHandlers.clickY = e.changedTouches[0].pageY;
		} else {
			EventHandlers.clickX = e.pageX;
			EventHandlers.clickY = e.pageY;
		}

		// and set global indicator that mouse is being dragged
		EventHandlers.mouseIsDown = true;
	},
	moveCenterItemHorizontally : function(direction) {
		console.log("horiz was called..." + direction);
		var hidden = $('.center');
		if (!hidden.hasClass('visible')) {
			hidden.animate({
				"left" : (direction==="right"?"160px":"-160px")
			}, "200").addClass('visible');
		} else {
			hidden.animate({
				"left" : "0px"
			}, "200").removeClass('visible');
		}
	}, 
	registerEventHandlers : function() {
		//console.log("eh was called...");
		$('#showMenu').on("click", function(){
			EventHandlers.moveCenterItemHorizontally("right");
		});
		$("#showSettings").on("click", function(){
			EventHandlers.moveCenterItemHorizontally("left");
		});

		$('body').on('mousedown', function(){
			EventHandlers.onMouseStart;
		});
		$('body').on('mouseup', function(){
			EventHandlers.onMouseEnd;
		});

		$('body').on('touchstart', function(){
			EventHandlers.onMouseStart;
		});
		$('body').on('touchend', function(){
			EventHandlers.onMouseEnd;
		});
	}
};

$(window).on('load',function(){
	EventHandlers.registerEventHandlers();
});