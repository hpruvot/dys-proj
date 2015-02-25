$(document).ready(function(){

	//jQuery time
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

	/**
	 Form animation
	*/
	// Click to bullets
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

			// Get the fieldset corresponding
			$("fieldset").each(function(){
    			if($(this).css("display") == "block") {
    				current_fs = $(this);
    			}
    		});

	    });

		// Check if values are filled
	    checkfieldsets(className[0]);

	});

	// Click to next
	$(".next").click(function() {

		// Get the current fieldset
		$("fieldset").each(function(){
			if($(this).css("display") == "block") {
				current_fs = $(this);
				className = current_fs.next().attr("class");
			}
		});

		// Check if values are filled
		checkfieldsets(className);

	});

	/* Check inputs values */
	var checkfieldsets = function(number) {
		var input1 = $("input.first");
		var input2 = $("input.second");
		var select = $("select.third option:selected");
		var input3 = $("input.fourth");

		var inputs = $("input");

		var text1 = $(".fs-bullet.first");
		var text2 = $(".fs-bullet.second");
		var text3 = $(".fs-bullet.third");
		var text4 = $(".fs-bullet.fourth");

		var textError = "Oops, vous devez remplir ce champ et en avant la musique !"

		// Clear class errors
		inputs.each(function() {
		  $(this).removeClass("error");
		  $(this).attr("placeholder", "");
		});

		switch(number) {
		    case "first":
		    	progressbar(number);
				bullets(number);
		    	fieldsets(number);
		        break;
		    case "second":
		        if(input1.val() == "") {
		        	input1.addClass("error");
					input1.attr("placeholder", textError);
					text1.glowerror("error", 1000);
		        }else {
		        	progressbar(number);
					bullets(number);
		    		fieldsets(number);
		        }
		        break;
		    case "third":
		        if(input1.val() == "") {
		        	input1.addClass("error");
					input1.attr("placeholder", textError);
					text1.glowerror("error", 1000);
		        } else if(input2.val() == "") {
					input2.addClass("error");
					input2.attr("placeholder", textError);
					text2.glowerror("error", 1000);
		        } else {
		        	progressbar(number);
					bullets(number);
		    		fieldsets(number);
		        }
		        break;
		    case "fourth":
		        if(input1.val() == "") {
		        	input1.addClass("error");
					input1.attr("placeholder", textError);
					text1.glowerror("error", 1000);
		        } else if(input2.val() == "") {
					input2.addClass("error");
					input2.attr("placeholder", textError);
					text2.glowerror("error", 1000);
		        } else if(select.val() == "") {
					$('.select-styled').addClass("error");
					text3.glowerror("error", 1000);
		        } else {
		        	progressbar(number);
					bullets(number);
		    		fieldsets(number);
		        }
		        break;
		    default:
			    progressbar(number);
				bullets(number);
		    	fieldsets(number);
		}
	}

	// Bullet title glow
	$.fn.extend({ 
        glowerror: function(className, duration) {
            var elements = this;
            setTimeout(function() {
                elements.removeClass(className);
            }, duration);

            return this.each(function() {
                $(this).addClass(className);
            });
        }
    });

	/* Animate the bullets */
	var bullets = function(number) {
		$("#progressbar li."+number+"").addClass("active");
		$("#progressbar li."+number+"").prevAll().addClass("active");
		$("#progressbar li."+number+"").nextAll().removeClass("active");
	}

	/* Animate the progressbar */
	var progressbar = function(number) {
		$(".timeline div").removeClass();
		$(".timeline div").addClass(number+" progress");
	}

	/* Animate the fieldsets */
	var fieldsets = function(number) {

		next_fs = $('fieldset.'+number+'');

		//show the previous fieldset
		next_fs.show(); 

		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
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

	/**
	 Select option for genre animation
	*/
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
	    		$(this).removeClass('active').next('ul.select-options').hide();
	    	}
	    	else{
	    		$(this).addClass('active').next('ul.select-options').show();
	    	}
	        
	    });
	  
	    $listItems.click(function(e) {
	        e.stopPropagation();
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.hide();
	    });

	});

	/**
	 Cover upload preview
	*/
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

