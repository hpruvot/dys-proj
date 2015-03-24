$(function() {

	var options = {
		segmentShowStroke : false,
		animateScale : false,
    	animationEasing : "easeOut",
    	percentageInnerCutout : 80
	}

	var data = [
	    {
	        value: 300,
	        color: "#EE7648"
	    },
	    {
	        value: 150,
	        color: "rgba(0,0,0,0)"
	    }
	]	

	// Get the context of the canvas element we want to select
	var ctx = document.getElementById("chart-votes").getContext("2d");
	var votesChart = new Chart(ctx).Doughnut(data, options);

})