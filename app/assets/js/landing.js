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

		// $(document).on("click", ".bullet", function(){
		// 	if($(this).hasClass("active")){
		// 		return;
		// 	}
		// 	var $activeSlide = $(".slide.active");
		// 	var currentIndex = $activeSlide.index();
		// 	var targetIndex = $(this).index();
		// 	var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
		// 	gotoSlide($activeSlide, $theSlide);
		// })

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

		sliderLoader();
		var sliderAnimation = setInterval(slider, 8000);

		function sliderLoader() {
			$("#four .loader").stop();
			$("#four .loader").width(0);
			$("#four .loader").animate({ 
				"width": "100%" 
			},8000);
		}

		function createEqualizer() {
			var winwidth = $(window).width();
			var equalizer = $("#equalizer");

			var nbbar = winwidth / 16;
			for(var i=0; i<nbbar; i++) {
				// var h1 = Math.random() * (275 - 108) + 108;
        		$("<div class='bar'>").appendTo(equalizer);
			}
		}
		createEqualizer();

		function equalizer(bar) {
		  // Syntax: Math.random() * (max-min = range) + min;
		  // My bars will be at least 70px, and at most 170px tall
		  var height = Math.random() * 100 + 100;
		  // Any timing would do the trick, mine is height times 7.5 to get a speedy yet bouncy vibe
		  var timing = height * 7.5;
		  // If you need to align them on a baseline, just remove this line and also the "marginTop: marg" from the "animate"
		  var marg = (170 - height) / 2;
		  
		  bar.animate({
		      height: height,
		      marginTop: marg
		  }, timing, function() {
		      equalizer($(this));
		  });
		}

		// Action on play-pause buttons can be added here (should be a wholesome function rather than annonymous)
		$('#equalizer .bar').each(function(i) {
			equalizer($(this));
		});

		calculateHeight();	

		// This is a functions that scrolls to #{blah}link
		function goToDiv(id){

		    $('html,body').animate({
		        scrollTop: $(id).offset().top},
		    'slow');
		}

		$('.arrowdown').click(function(e) {
			e.preventDefault(); 
			goToDiv($(this).attr("href"));  
		})

		$("#menu a:not('.social')").click(function(e) { 
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

		/* Form newsletter */
		$("#newsletter").submit(function(event) {
			event.preventDefault();

			$.ajax({
			   url: 'http://preprod.synerghetic.net/0976-14/register.php',
			   type: 'POST',
			   data: $('form#newsletter').serialize(),
			   error: function() {
			      $('form#newsletter .already').addClass("active").delay(3000).queue(function(){
			      	$(this).html(data.message);
				    $(this).removeClass("active");
				    $(this).dequeue();
			  	});
			   },
			   success: function(data) {
			    	console.log(data);
			    	$('form#newsletter .submitted, form#newsletter .submit').addClass("active").delay(3000).queue(function(){
			    		$('form#newsletter .submitted').html(data.message);
					    $(this).removeClass("active");
					    $(this).dequeue();
				  	});
			   }
			});	

		});
})