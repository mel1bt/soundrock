google.load("jquery", "1.4.2");
google.setOnLoadCallback(function()
{
	var playDj = false;
	var mousedown = false;
  
	$("#playbutton").click(function() {
		if(playDj) {
          audioDj.pause();
			$("#playbtn").attr("src", "images/btn-play.png");
			playDj = false;
          $("#vinyl1").each(function() {
				var intervalHandle = $(this).data('intervalHandle');
				clearInterval(intervalHandle);
				$(this)
					.css({ 'cursor' : 'default' })
					.stop()
					.animate({rotate: '+=40deg'}, 800, 'easeOutCubic');				
			});
		} else {
           audioDj.play();
           audioDj.volume=0.5;
          audioDj.setAttribute("loop","loop");
			$("#playbtn").attr("src", "images/btn-pause.png");
			playDj = true;
			$("#vinyl1").each(function() {
				$(this)
					.css({ 'cursor' : 'move' })
					.data('rotationAngle', 10);
				startSpinning($(this));
			});
		}
	});

	$("#vinyl1").mousedown(function(e) {
		var intervalHandle = $(this).data('intervalHandle');
		clearInterval(intervalHandle);
		mousedown = true;
	}).mouseup(function() {
		mousedown = false;
		if(playDj) {
			startSpinning($(this));
		}
	});

	$("#vinyl1").mousemove(function(e){
		if(mousedown && playDj) {
			var intervalHandle = $(this).data('intervalHandle');
			clearInterval(intervalHandle);
			$(this).rotate(e.pageX % 360);
		}
	});
	
	$("#speedbutton1").click(function() {
		if($(this).data('isEnabled')) {
			$("#vinyl1").data('rotationAngle', $("#vinyl1").data('rotationAngle') + 10);
		}
        rewindAudio();
		checkButtons();
	});
	
	$("#slowbutton1").click(function() {
		if($(this).data('isEnabled')) {
			$("#vinyl1").data('rotationAngle', $("#vinyl1").data('rotationAngle') - 10);
		}
      forwardAudio();
		checkButtons();
	});
	
	$("#speedbutton2").click(function() {
		disminVelocAudio();
    });
	
	$("#slowbutton2").click(function() {
      aumentVelocforwardAudio();
	});
	
	function startSpinning(element) {
		element.stop().animate({rotate: '+=40deg'}, 800, 'easeInCubic', function() {
			var intervalHandle = setInterval(
		 	   function () {
		  	      element.animate({rotate: '+=' + element.data('rotationAngle') + 'deg'}, 0);
		  	  },
		  	  25
			);
			element.data('intervalHandle', intervalHandle);
		});
	}
	
	function checkButtons() {
		if($("#vinyl1").data('rotationAngle') == 0) {
			$("#slowbutton1")
				.data('isEnabled', false)
				.children().attr("src", "images/btn-slow-dis.png");
		} else {
			$("#slowbutton1")
				.data('isEnabled', true)
				.children().attr("src", "images/btn-slow.png");
		}
		
		if($("#vinyl1").data('rotationAngle') == 50) {
			$("#speedbutton1")
				.data('isEnabled', false)
				.children().attr("src", "images/btn-fast-dis.png");
		} else {
			$("#speedbutton1")
				.data('isEnabled', true)
				.children().attr("src", "images/btn-fast.png");
		}
	}
	
  
             // Rewinds the audio file by 30 seconds.

        function rewindAudio() {
             // Check for audio element support.
            if (window.HTMLAudioElement) {
                try {
                    //var oAudio = document.getElementById('myaudio');
                  //audioObject.currentTime -= 50;
                    audioDj.currentTime -= 10;
                }
                catch (e) {
                    // Fail silently but show in F12 developer tools console
                     if(window.console && console.error("Error:" + e));
                }
            }
        }

        function forwardAudio() {
            if (window.HTMLAudioElement) {
                try {
                    audioDj.currentTime  += 10;
                    
                }
                catch (e) {
                     if(window.console && console.error("Error:" + e));
                }
            }
        }
        function aumentVelocforwardAudio() {
                if (window.HTMLAudioElement) {
                try {
                    audioDj.playbackRate -= 0.1;
                }
                catch (e) {
                     if(window.console && console.error("Error:" + e));
                }
            }
        }
        function disminVelocAudio() {
                if (window.HTMLAudioElement) {
                    try {
                        audioDj.playbackRate += 0.2;
                    }
                    catch (e) {
                         if(window.console && console.error("Error:" + e));
                    }
                }
            }
});