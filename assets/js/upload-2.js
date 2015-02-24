$(document).ready(function(){

	//jQuery time
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

	$(".fs-bullet").click(function() {

		// Get number of selected bullet
		var className = $(this).prop('class').split(' ');
		var removeItem1 = "fs-bullet";
		var removeItem2 = "active";
		className = jQuery.grep(className, function(value) {
		  return value != removeItem1 && value != removeItem2;
		});

		$(this).each(function() {

	    	if(animating) return false;
			animating = true;

			$("fieldset").each(function(){
    			if($(this).css("display") == "block") {
    				current_fs = $(this);
    			}
    		});

	    });

		progressbar(className[0]);
		bullets(className[0]);
	    timeline(className[0]);
	});

	$(".next").click(function() {

		$("fieldset").each(function(){
			if($(this).css("display") == "block") {
				current_fs = $(this);
				className = current_fs.next().attr("class");
			}
		});

		progressbar(className);
		bullets(className);
	    timeline(className);

	});


	var bullets = function(number) {
		$("#progressbar li."+number+"").addClass("active");
		$("#progressbar li."+number+"").prevAll().addClass("active");
		$("#progressbar li."+number+"").nextAll().removeClass("active");
	}

	var progressbar = function(number) {
		$(".timeline div").removeClass();
		$(".timeline div").addClass(number+" progress");
	}

	var timeline = function(number) {

		next_fs = $('fieldset.'+number+'');
		//other_fs = $('fieldset:not(.'+number+')');

		
		//show the previous fieldset
		next_fs.show(); 

		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//2. take current_fs to the right(50%) - from 0%
				left = (now)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;

				current_fs.css({'opacity': opacity});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
		if(number == "fourth") {
			$(".submit").addClass("active");
		}
		else {
			$(".submit").removeClass("active");
		}
	}

	$(".submit").click(function(){
		return false;
	})

	/* Select options */
	$('select').each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;
	  
	    $this.addClass('select-hidden'); 
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.text($this.children('option').eq(0).text());
	  
	    var $list = $('<ul />', {
	        'class': 'select-options'
	    }).insertAfter($styledSelect);
	  
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($list);
	    }
	  
	    var $listItems = $list.children('li');

	    $('div.select-styled').click(function() {
	    	if($(this).hasClass('active')){
	    		console.log("if");
	    		$(this).removeClass('active').next('ul.select-options').hide();
	    	}
	    	else{
	    		console.log("else");
	    		$(this).addClass('active').next('ul.select-options').show();
	    	}
	        
	    });
	  
	    $listItems.click(function(e) {
	        e.stopPropagation();
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.hide();
	        //console.log($this.val());
	    });

	});

	/* Cover upload */
	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#cover').attr('src', e.target.result);
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#coverToUpload").change(function(){
	    readURL(this);
	});
})

