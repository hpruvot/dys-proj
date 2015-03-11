$(document).ready(function(){

	/* Responsive menu function */
	var menutoggle = function() {
		if ($( window ).width() < 1024 ) {
	      	$("#left-bar").addClass("resp");
	      	$("#container").addClass("resp");
	   	} else {
	      	$("#left-bar").removeClass("resp");
	      	$("#container").removeClass("resp");
	   	}
	}

	var responsive = function() {
		if ($( window ).width() < 640 ) {
			$("#pl-nav-resp").addClass("resp");
		} else {
			$("#pl-nav-resp").removeClass("resp");
		}
	}

	//  Creating our button for smaller screens
	var leftbar = document.getElementById('left-bar');
	var menuElements = document.getElementById('menu');
	if(menuElements) {
		menuElements.insertAdjacentHTML('beforeBegin','<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icon-menu"> </i></button>');
	}

	$('#menu li').on("click",function(){
		if($('.navtoogle').hasClass("active")) {
			$('.navtoogle').removeClass('active');
			$('#leftbar').removeClass('resp');
			$("#container").removeClass("active");
			$("body").removeClass("inactive");
		}
	});


	//  Toggle the class on click to show / hide the menu
	document.getElementById('menutoggle').onclick = function() {
		$('.navtoogle').toggleClass('active');
		$('#leftbar').toggleClass('resp');
		$("#container").toggleClass("active");
		$("body").toggleClass("inactive");
	}

	/* Item menu */
	$(window).on("scroll", onScroll);
	
	function onScroll(event){
		event.preventDefault();
	    var scrollPos = $(window).scrollTop();
	    $('#menu li.item a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if ((refElement.position().top)-70 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('#menu ul li.item a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}

	$(window).on("resize", function (e) {
        menutoggle();
        responsive();
    });

	menutoggle();
	responsive();
	
});