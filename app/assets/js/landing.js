$(document).ready(function(){

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
			var animation = document.getElementById('equalizer');
  
			function onAnimation( evt ) {
				evt.stopPropagation();
			}

			animation.addEventListener('webkitAnimationStart', onAnimation, false);
			animation.addEventListener('webkitAnimationIteration', onAnimation, false);
			animation.addEventListener('animationStart', onAnimation, false);
		    animation.addEventListener('animationIteration', onAnimation, false);
		}
		equalizer();
})