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


	//  Toggle the class on click to show / hide the menu
	document.getElementById('menutoggle').onclick = function() {
		$('.navtoogle').toggleClass('active');
		$('#leftbar').toggleClass('resp');
		$("#container").toggleClass("active");
		$("body").toggleClass("inactive");
	}

	$(window).on("resize", function (e) {
        menutoggle();
        responsive();
    });

	menutoggle();
	responsive();
	
});