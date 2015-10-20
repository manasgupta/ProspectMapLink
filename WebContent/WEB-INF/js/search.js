var map;
var markers = [];

function initialize() {

	map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom : 3,
		center : new google.maps.LatLng(26.335100, 13.22833),
		scrollwheel : true,
		draggable : true,
		minZoom : 3,
		maxZoom : 20,
		zoomControl : true,
		zoomControlOptions : {
			style : google.maps.ZoomControlStyle.LARGE,
			position : google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl : true,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		zoomControlOptions : {
			position : google.maps.ControlPosition.RIGHT_BOTTOM,
			style : google.maps.ZoomControlStyle.SMALL
		},
		mapTypeControl : true,
		mapTypeControlOptions : {
			style : google.maps.MapTypeControlStyle.DEFAULT,
			position : google.maps.ControlPosition.TOP_RIGHT
		},
		panControl : false
	});

	var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(
			21.30694, -157.85833), new google.maps.LatLng(36.86667, 174.76667));
	map.fitBounds(defaultBounds);

	var input = (document.getElementById('searchBox'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	var button = (document.getElementById('searchButton'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);

}

function searchFunction() {
	var searchBox = $('#searchBox').val();
	var data;
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0, marker; marker = markers[i]; i++) {
		marker.setMap(null);
	}
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="
			+ searchBox, function(data) {
		$.each(data.results, function(i, item) {
			var marker = new google.maps.Marker({
				map : map,
				title : data.results[i].formatted_address,
				position : data.results[i].geometry.location,
				draggable : false,
				animation : google.maps.Animation.DROP
			});
			google.maps.event.addListener(marker, 'click', function() {
				$('#myModal').modal('show');
			});
			markers.push(marker);
		})

		bounds.extend(data.results[i].geometry.location);
		map.fitBounds(bounds);

		google.maps.event.addListener(map, 'bounds_changed', function() {
			var bounds = map.getBounds();
			searchBox.setBounds(bounds);
		});

	});
	
}

$(document).ready(function(){
    $('#searchBox').keypress(function(e){
      if(e.keyCode==13)
      $('#searchButton').click();
    });
});

google.maps.event.addDomListener(window, 'load', initialize);