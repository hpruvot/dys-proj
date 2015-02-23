$(document).ready(function(){

	var form = document.getElementById('music-upload');
	var fileSelect = document.getElementById('fileToUpload');
	var music = document.getElementById('music-selected');

	fileSelect.onchange = function(event) {
		console.log("coucou1");
    	event.preventDefault();

		// Update button text.
		music.innerHTML = 'Uploading...';

		// Get the selected files from the input.
		var file = fileSelect.files[0];
		// Create a new FormData object.
		var formData = new FormData();
		formData.append('file', file);

		// Add the file to the request.
	  	//formData.append('music[]', file, file.name);

	  	// Files
		//formData.append(name, file, filename);

		// Set up the request.
		var xhr = new XMLHttpRequest();

		// Open the connection.
		xhr.open('POST', form.getAttribute('action'), true);

		//Set up a handler for when the request finishes.
		xhr.onload = function () {
		  if (xhr.status === 200) {
		    // File(s) uploaded.
		    music.innerHTML = 'Upload';
		  } else {
		    alert('An error occurred!');
		  }
		};

		// Send the Data.
		xhr.send(formData);
		return false;
	};
})