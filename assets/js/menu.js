$(document).ready(function(){

	//  The function to change the class
	var changeClass = function (r,className1,className2) {
		var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
		if( regex.test(r.className) ) {
			r.className = r.className.replace(regex,' '+className2+' ');
	    }
	    else{
			r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
	    }
	    return r.className;
	};	

	  /* Responsive menu function */
	var menutoggle = function() {
		if ($( window ).width() < 720 ) {
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
	menuElements.insertAdjacentHTML('beforeBegin','<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icon-menu"> </i></button>');


	//  Toggle the class on click to show / hide the menu
	document.getElementById('menutoggle').onclick = function() {
		changeClass(this, 'navtoogle active', 'navtoogle');
		changeClass(leftbar, 'resp active', 'resp');
	}

	$(window).on("resize", function (e) {
        menutoggle();
        responsive();
    });

	menutoggle();
	responsive();
	
});