$(document).ready(function(){

	//caching
	//the main wrapper of the gallery
	var $fp_gallery			= $('#fp_gallery')
	//the overlay when the large image is displayed
	var $fp_overlay			= $('#fp_overlay');
	//image loading status
	var $fp_loading			= $('#fp_loading');
	//the next and previous buttons
	var $fp_next			= $('#fp_next');
	var $fp_prev			= $('#fp_prev');
	//the close button
	var $fp_close			= $('#fp_close');
	//the main container for the thumbs structure
	var $fp_thumbContainer 	= $('#fp_thumbContainer');
	//wrapper of jquery ui slider
	var $fp_scrollWrapper	= $('#fp_scrollWrapper');
	//wrapper of each content div, where each image is
	var $fp_content_wrapper;
	//total number of images
	var nmb_images=0;
	//which gallery is clicked (index)
	var gallery_idx=-1;
	//scroller wrapper
	var $fp_thumbScroller	= $('#fp_thumbScroller');
	//jquery ui slider
	var $slider				= $('#slider');
	//the links of the galleries (the cities)
	var $fp_galleries		= $('#fp_galleryList > li');
	//current image being viewed
	var current				= 0;
	//some control flags:
	//prevent fast clicks on next and previous
	var photo_nav			= true;


	//User clicks next button (preview mode)
	$fp_next.bind('click',function(){
		if(photo_nav){
			photo_nav = false;
			navigate(1);
		}	
	});

	//User clicks previous button (preview mode)
	$fp_prev.bind('click',function(){
		if(photo_nav){
			photo_nav = false;
			navigate(0);
		}	
	});

	//shows next or previous image
	//1 is right;0 is left
	function navigate(way){
		//show loading image
		$fp_loading.show();
		if(way==1){
			++current;
			var $current = $fp_thumbScroller.find('.container:nth-child('+parseInt(gallery_idx+1)+')')
											.find('.content:nth-child('+parseInt(current+1)+')');
			if($current.length == 0){
				--current;
				$fp_loading.hide();
				photo_nav = true;
				return;
			}
		}
		else{
			--current;
			var $current = $fp_thumbScroller.find('.container:nth-child('+parseInt(gallery_idx+1)+')')
											.find('.content:nth-child('+parseInt(current+1)+')');
			if($current.length == 0){
				++current;
				$fp_loading.hide();
				photo_nav = true;
				return;
			}
		}
			
		//load large image of next/previous content div
		$('').load(function(){
			$fp_loading.hide();
			var $large_img 		= $(this);
			var $fp_preview 	= $('#fp_preview');
			
			//make the current one slide left if clicking next
			//make the current one slide right if clicking previous
			var animate_to 		= -$fp_preview.width();
			var animate_from	= $(window).width();
			if(way==0){
				animate_to 		= $(window).width();
				animate_from	= -$fp_preview.width();
			}
			//now we want that the thumb (of the last image viewed) 
			//stays centered on the screen
			centerImage($current,false,1000);
			$fp_preview.stop().animate({'left':animate_to+'px'},500,function(){
				$(this).remove();
				$large_img.addClass('fp_preview');
				getFinalValues($large_img);
				var largeW 	= $large_img.data('width');
				var largeH 	= $large_img.data('height');
				var $window	= $(window);
				var windowW = $window.width();
				var windowH = $window.height();
				var windowS = $window.scrollTop();
				$large_img.css({
					'width'		: largeW+'px',
					'height'	: largeH+'px',
					'top'		: windowH/2 -largeH/2 + windowS + 'px',
					'left'		: animate_from + 'px',
					'opacity' 	: 1	
				}).appendTo($fp_gallery)
				  .stop()
				  .animate({
					'left':windowW/2 -largeW/2+'px'
				  },500,function(){photo_nav = true;});
			});
		}).attr('src',$current.find('img').attr('alt'));	
	}




	// $('<div id="next_arrow">Next</div>') 
	//     .prependTo("body") //append the Next arrow div to the bottom of the document
	//     .click(function(){ 
	//       scrollLeft = $(window).scrollLeft(); 
	//       $('#container h2').each(function(i, h2){ // loop through article headings 
	//         h2Left = $(h2).offset().left; // get article heading left 
	//         if (scrollLeft<h2Left) { // compare if document is left of heading 
	//           $.scrollTo(h2, 800); // scroll to in .8 of a second
	//           return false; // exit function 
	//         } 
	//       }); 
	//     }); 
	//$('.row-slider .prev').css("visibility","hidden");
	
	$('li.next').click(function(){
		jQuery('#pl-news .playlists').animate({ scrollTop: jQuery('#pl-news .playlists #last').offset().left}, 'slow');
		//$.scrollTo($(this).position().top,800);
	})
	

	$('.row-slider').show().find('li').on('click', function() {

		var rowSlide = $(this).parent().closest("div");
		var pl = $(this).parent().closest("div").find(".pl-single").closest("div");
		var playlists = rowSlide.closest("div").find(".playlists");
		var plWidth = pl.width()+20;
		var plLen = pl.length;
		var totalPlWidth = plLen * plWidth;

		var scrollable = ((plLen-5)*plWidth) - 180

		var direction = $(this).attr('class');
	    var loc = plWidth;

	   // console.log($(playlists).offset().left);

	    //transition(rowSlide, plWidth, direction);

	    // var prev = playlists.parent().children().find("li")[0];
	    // var next = playlists.parent().children().find("li")[1];

	    // if(playlists.scrollLeft() == 0) {
	    // 	$(prev).css("visibility","hidden");
	    // 	$(next).css("visibility","visible");
	    // }
	    // else if(playlists.scrollLeft() == scrollable) {
	    // 	$(prev).css("visibility","visible");
	    // 	$(next).css("visibility","hidden");
	    // }
	    // else {
	    // 	$(prev).css("visibility","visible");
	    // 	$(next).css("visibility","visible");
	    // }

	    var next;

		if ( next === undefined ) {
			next = pl.next();
		} else {
			next = next.next();   
		}

		playlists.animate({scrollTop:next.scrollTop()});

	    //console.log(playlists.animate({scrollTop:next.scrollTop()}));

	});

	var transition = function(container,plWidth,direction) {
	    var unit;

	    if (direction && plWidth !== 0) {
	      unit = (direction === 'prev') ? '-=' : '+=';
	    }

	    container.closest("div").find(".playlists").animate({ scrollLeft: unit+plWidth }, 500);

    };
})