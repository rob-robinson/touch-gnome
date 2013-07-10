var EventHandlers = {
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
	registerEventHandlers : function(){
		document.getElementById("showMenu").addEventListener("click", makeMenuVisible);
		document.getElementById("showSettings").addEventListener("click", makeSettingsVisible);

		document.body.addEventListener('mousedown', onMouseStart, false);
		document.body.addEventListener('mouseup', onMouseEnd, false);

		document.body.addEventListener('touchstart', onMouseStart, false);
		document.body.addEventListener('touchend', onMouseEnd, false);
	}
};