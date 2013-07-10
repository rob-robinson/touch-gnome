var EventHandlers = {
	mouseIsDown : false, 
	clickX : null, 
	clickY : null, 
	releaseX : null, 
	releaseY : null, 
	onMouseEnd:function(e) {
		// basically setting globals clickY and clickX to where click or touch event ended...:
		var newKey, mouseIsDown = false;

		if (e.changedTouches && e.changedTouches.length > 0) {
			releaseX = e.changedTouches[0].pageX;
			releaseY = e.changedTouches[0].pageY;

			// determine greatest swipe directional velocity:
			var xOry = (Math.abs(releaseX - clickX) > Math.abs(releaseY - clickY)) ? "x" : "y";

			switch (xOry) {

				case 'x':
					if (Math.abs(releaseX - clickX) > 80) {
						if (releaseX - clickX > 0) {// moved x in a positive way
							// show menu...
							makeMenuVisible();
						} else {// moved x in a nagative way
							// show settings
							makeSettingsVisible();
						}
					}
					break;
			} // end case 'x'
		} else {
			releaseX = e.pageX;
			releaseY = e.pageY;
		}
	}, 
	onMouseStart	: function(e) {
		// basically setting globals clickY and clickX to where click or touch event started...:
		if (e.changedTouches && e.changedTouches.length > 0) {
			clickX = e.changedTouches[0].pageX;
			clickY = e.changedTouches[0].pageY;
		} else {
			clickX = e.pageX;
			clickY = e.pageY;
		}

		// and set global indicator that mouse is being dragged
		mouseIsDown = true;
	},
	moveCenterItemHorizontally : function() {
		//console.log("horiz was called...");
		var hidden = $('.center');
		if (!hidden.hasClass('visible')) {
			hidden.animate({
				"left" : "160px"
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
			EventHandlers.moveCenterItemHorizontally();
		});
		//document.getElementById("showSettings").addEventListener("click", this.moveCenterItemHorizontally("left"));

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