$(document).ready(function(){

	// Set height cover 
	setTimeout(function(){
	    var divWidth = $('.pl-cover').width();
	    $('.pl-cover').height(divWidth);
	}, 100);

	$(window).on("resize", function (e) {
		var divWidth = $('.pl-cover').width();
	    $('.pl-cover').height(divWidth);
	});

	var position1 = 0;
    var position2 = 0;
    var position3 = 0;

	$('.row-slider').show().find('li').on('click', function() {
		var rowSlide = $(this).parent().closest("div");
		var direction = $(this).attr('class');

		slider(rowSlide,direction);
	})

	var slider = function(container,direction) {
		var pl = container.find(".pl-single").closest("div");
		var playlists = container.children().eq(3);
		var playlistsWidth = playlists.width() + 20;
		var plLen = pl.length;

		var prev = container.children().eq(2).children().eq(0);
		var next = container.children().eq(2).children().eq(1);

	    var ml = parseInt(playlists.css("margin-left"));

	    // Nombre de divs entières contenant 5 playlists
	    var divs = Math.ceil(plLen/5);
	   
	    if(container.attr("id") == "pl-news") {
	    	if(direction == "next") {
		    	position1 ++;
		    	// Arrivée à la fin 
		    	if(position1 == divs - 1) {
		    		next.addClass("desactive");
		    		prev.removeClass("desactive");
		    	} else {
		    		prev.removeClass("desactive");
		    	}
		    } else {
		    	position1 --;
		    	// Arrivée au début
		    	if(position1 == 0) {
		    		prev.addClass("desactive");
		    		next.removeClass("desactive");
		    	} else {
		    		next.removeClass("desactive");
		    	}
		    }

	    } else if(container.attr("id") == "pl-love") {
	    	if(direction == "next") {
		    	position2 ++;
		    	// Arrivée à la fin 
		    	if(position2 == divs - 1) {
		    		next.addClass("desactive");
		    		prev.removeClass("desactive");
		    	} else {
		    		prev.removeClass("desactive");
		    	}
		    } else {
		    	position2 --;
		    	// Arrivée au début
		    	if(position2 == 0) {
		    		prev.addClass("desactive");
		    		next.removeClass("desactive");
		    	} else {
		    		next.removeClass("desactive");
		    	}
		    }

	    } else {
	    	if(direction == "next") {
		    	position3 ++;
		    	// Arrivée à la fin 
		    	if(position3 == divs - 1) {
		    		next.addClass("desactive");
		    		prev.removeClass("desactive");
		    	} else {
		    		prev.removeClass("desactive");
		    	}
		    } else {
		    	position3 --;
		    	// Arrivée au début
		    	if(position3 == 0) {
		    		prev.addClass("desactive");
		    		next.removeClass("desactive");
		    	} else {
		    		next.removeClass("desactive");
		    	}
		    }
	    }
	    
	    // Slide
	    if(direction == "next") {
	    	playlists.animate({
    			marginLeft: ml - playlistsWidth
			}, 500);
	    } else {
	    	playlists.animate({
	    		marginLeft: ml + playlistsWidth
	    	}, 500);
	    }

	}
})