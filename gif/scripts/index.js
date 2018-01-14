var OFFSET = 0, SEARCH_TERM = '', RANDOM = false;

function TRENDING(os, cb) {
	$.getJSON('https://api.giphy.com/v1/gifs/trending?api_key=ogFh2Yh3T5YiXyXlf4EqWdRTTSRklSST&limit=12&offset='
						+ os,
 		function(data) {
 			cb(data);
 		}
 	);
}

function SEARCH(os, cb) {
	$.getJSON('https://api.giphy.com/v1/gifs/search?api_key=ogFh2Yh3T5YiXyXlf4EqWdRTTSRklSST&q='
	  				+ SEARCH_TERM
	  				+ '&limit=12&offset='
	  				+ os
	  				+ '&lang=en',
	  		function(data) {
	  			cb(data);
	  		}
	  	);
}

$(document).ready(function() {
	SEARCH_TERM = $('#search').val();

	if(SEARCH_TERM != '') {
		SEARCH(OFFSET, function(data) {
	  	$('#results').html('');
	  	var results = data.data;
	  	var items = [];
			for(gif of results) {
			 	var div = document.createElement('div'),
			 			img = document.createElement('img');
			 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
			 	div.className += 'result';
			 	$('#results').append(div);
			}
	  });
	} else {
		TRENDING(OFFSET, function(data) {
			var results = data.data;
		 	var items = [];
			for(gif of results) {
				var div = document.createElement('div'),
		  	img = document.createElement('img');
			 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
			 	div.className += 'result';
			 	$('#results').append(div);
			}
		});
	}

  $(document).scroll(function() {
   	if($(window).scrollTop() + $(window).height() >= $(document).height()
   		 && !RANDOM) {
      OFFSET += 12;
      if(SEARCH_TERM != '') {
      	SEARCH(OFFSET, function(data) {
		  		var results = data.data;
		  		var items = [];
					for(gif of results) {
					 	var div = document.createElement('div'),
					 			img = document.createElement('img');
					 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
					 	div.className += 'result';
					 	$('#results').append(div);
					}
		  	});
      } else {
      	TRENDING(OFFSET, function(data) {
					var results = data.data;
				 	var items = [];
					for(gif of results) {
						var div = document.createElement('div'),
				  	img = document.createElement('img');
					 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
					 	div.className += 'result';
					 	$('#results').append(div);
					}
				});
      }
   	}
	});


  $('#search').on('input', function(e) {
  	SEARCH_TERM = e.target.value;
  	OFFSET = 0, RANDOM = false;
  	if(SEARCH_TERM != '') {
	  	SEARCH(OFFSET, function(data) {
	  		$('#results').html('');
	  		var results = data.data;
	  		var items = [];
				for(gif of results) {
				 	var div = document.createElement('div'),
				 			img = document.createElement('img');
				 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
				 	div.className += 'result';
				 	$('#results').append(div);
				}
	  	});
	  } else {
	  	TRENDING(OFFSET, function(data) {
	  		$('#results').html('');
				var results = data.data;
			 	var items = [];
				for(gif of results) {
					var div = document.createElement('div'),
			  	img = document.createElement('img');
				 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
				 	div.className += 'result';
				 	$('#results').append(div);
				}
			});
	  }
  });

  $('#random').click(function() {
  	$.getJSON('https://api.giphy.com/v1/gifs/random?api_key=ogFh2Yh3T5YiXyXlf4EqWdRTTSRklSST&tag='
  						+ SEARCH_TERM,
  		function(data) {
  			OFFSET = 0, RANDOM = true;
  			$('#results').html('');
			  var div = document.createElement('div'),
			 			img = document.createElement('img');
			 	div.innerHTML = '<img src='+ data.data.image_url +'></a>';
		  	div.className += 'result';
		  	$('#results').append(div);
		  }
  	);
  });

  $(document).keypress(function(e) {
  	if(e.charCode === 13 && SEARCH_TERM != '') {
  		OFFSET = 0, RANDOM = false;
  		SEARCH(OFFSET, function(data) {
	  		$('#results').html('');
	  		var results = data.data;
	  		var items = [];
				for(gif of results) {
				 	var div = document.createElement('div'),
				 			img = document.createElement('img');
				 	div.innerHTML = '<img src='+ gif.images.original.url +'></a>';
				 	div.className += 'result';
				 	$('#results').append(div);
				}
	  	});
  	}
  });
});