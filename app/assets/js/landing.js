$(document).ready(function() {

		var $slider = $(".slider"), $bullets = $(".bullets");

		function calculateHeight(){
			var height = $(".slide.active").outerHeight();
			$slider.height(height);
		}

		$(window).resize(function() {
			calculateHeight();
		    clearTimeout($.data(this, 'resizeTimer'));
		});
		
		function resetSlides(){
			$(".slide.inactive").removeClass("inactiveRight").removeClass("inactiveLeft");
		}

		function gotoSlide($activeSlide, $slide, className){
			 $activeSlide.removeClass("active").addClass("inactive "+className);
			 $slide.removeClass("inactive").addClass("active");
			 calculateHeight();
			 resetBullets();
			 setTimeout(resetSlides, 300);
		}

		$(document).on("click", ".bullet", function(){
			if($(this).hasClass("active")){
				return;
			}
			var $activeSlide = $(".slide.active");
			var currentIndex = $activeSlide.index();
			var targetIndex = $(this).index();
			console.log($(".slide.active").index(), targetIndex);
			var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
			gotoSlide($activeSlide, $theSlide, currentIndex > targetIndex ? "inactiveRight" : "inactiveLeft");
		})

		function resetBullets(){
			$(".bullet.active").removeClass("active");
			var index = $(".slide.active").index()+1;
			console.log(index);
			$(".bullet:nth-child("+index+")").addClass("active");
		}

		calculateHeight();	

		function equalizer() {
			var winwidth = $(window).width();
			var equalizer = $("#equalizer");

			var nbbar = (winwidth / 16 /4);
			console.log(nbbar);
			for(var i=1; i<=nbbar; i++) {
				var h1 = Math.random() * (375 - 178) + 178;
				var animation = Math.floor(Math.random() * 4 + 1);
				for(var j=1; j<=4; j++) {
        			$("<div class='bar'>").height(h1).css({
    					'-webkit-animation-name': 'equalize'+ j
					}).appendTo(equalizer);
        		}
			}
			
		}
		equalizer();
})