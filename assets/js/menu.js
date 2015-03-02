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

	//  Creating our button for smaller screens
	var menuElements = document.getElementById('menu');
	menuElements.insertAdjacentHTML('beforeBegin','<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icon-menu"> </i></button>');

	//  Toggle the class on click to show / hide the menu
	document.getElementById('menutoggle').onclick = function() {
		changeClass(this, 'navtoogle active', 'navtoogle');
	}

	// document click to hide the menu
	// http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/comment-page-2/#comment-438918
	// document.onclick = function(e) {
	// 	var mobileButton = document.getElementById('menutoggle'),
	// 		buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

	// 	if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
	// 		changeClass(mobileButton, 'navtoogle active', 'navtoogle');
	// 	}
	// }

	$(window).on("resize", function (e) {
        menutoggle();
    });

	menutoggle();
	
});