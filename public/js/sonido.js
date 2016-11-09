google.load("jquery", "1.4.2");
google.setOnLoadCallback(function()
{
    var playing = false;
    var mousedown = false;
    var reproductor=$(".cda"); 
    $(".playbutton").click(function() {    
        if(playing) {
            $(".playbtn").attr("src", "art/cd.png");
            playing = false;
            $(".cda").removeAttr("src");
            $("#vinyl2").each(function() {
                var intervalHandle = $(this).data('intervalHandle');
                clearInterval(intervalHandle);
                $(this)
                    .css({ 'cursor' : 'default' })
                    .stop()
                    .animate({rotate: '+=40deg'}, 800, 'easeOutCubic');
            });
        } else {
            // Play
       reproductor.attr("src", $(this).attr("data-mp3"));
       reproductor.attr("autoplay","autoplay");
       reproductor.attr("loop","loop");
       console.log(reproductor);
            $(".playbtn").attr("src", "art/cd.png");
            playing = true;
            $("#vinyl2").each(function() {
                $(this)
                    .css({ 'cursor' : 'move' })
                    .data('rotationAngle', 10);
                startSpinning($(this));
            });
        }
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
});