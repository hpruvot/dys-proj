$(document).ready(function() {

		var $slider = $(".slider"), $bullets = $(".bullets");

		function calculateHeight(){
			var height = $(".slide.active").outerHeight();
			$slider.height(height);
		}

		$(window).resize(function() {
			calculateHeight();
		    clearTimeout($.data(this, 'resizeTimer'));
		    respImg();
		});
		
		function resetSlides(){
			$(".slide.inactive").removeClass("inactive");
		}

		function gotoSlide($activeSlide, $slide){
			 $activeSlide.removeClass("active").addClass("inactive ");
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
			var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
			gotoSlide($activeSlide, $theSlide);
		})

		function resetBullets(){
			$(".bullet.active").removeClass("active");
			var index = $(".slide.active").index()+1;
			$(".bullet:nth-child("+index+")").addClass("active");
		}
		function slider() {
		    var $activeSlide = $(".slide.active");
			var currentIndex = $activeSlide.index();
			var targetIndex = $(".bullet.active").index()+1;
			if(targetIndex == 3) {
				targetIndex = 0;
			}
			var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
			gotoSlide($activeSlide, $theSlide);
			sliderLoader();
		}

		// sliderLoader();
		// var sliderAnimation = setInterval(slider, 8000);

		function sliderLoader() {
			$("#four .loader").stop();
			$("#four .loader").width(0);
			$("#four .loader").animate({ 
				"width": "100%" 
			},8000);
		}

		calculateHeight();	

		function equalizer() {
			var winwidth = $(window).width();
			var equalizer = $("#equalizer");

			var nbbar = (winwidth / 16 /4);
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
		// equalizer();

		// This is a functions that scrolls to #{blah}link
		function goToDiv(id){

		    $('html,body').animate({
		        scrollTop: $(id).offset().top-70},
		    'slow');
		}

		$('.arrowdown').click(function(e) {
			e.preventDefault(); 
			goToDiv($(this).attr("href"));  
		})

		$("#menu a").click(function(e) { 
		      // Prevent a page reload when a link is pressed
		    e.preventDefault(); 
		    $("#menu li").removeClass("active");
		    $(this).parent().addClass("active");
		      // Call the scroll function         
		    goToDiv($(this).attr("href"));  
		});

		/* Image responsive */
		var respImg = function() {
			var img = $("#two .landing-image");
			var div = $("#two .row");
			if ($( window ).width() < 640 ) {
				$(img).before(div);
			} else {
				$(div).before(img);
			}
		}
		respImg();
})