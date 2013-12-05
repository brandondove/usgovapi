(window.badove.signaturesheatmap = function($) {
	var map, pointarray, heatmap;

	return {
		init: function(mapid, callback) {
			var mapOptions = {
				zoom: 4,
				center: new google.maps.LatLng(39.8282, -98.5795),
				mapTypeId: google.maps.MapTypeId.SATELLITE
			};

			map = new google.maps.Map(document.getElementById(mapid),
				mapOptions);

			pointarray = new google.maps.MVCArray();

			heatmap = new google.maps.visualization.HeatmapLayer({
				data: pointarray
			});

			heatmap.setMap(map);
			callback();
		},
		addLatLonPoint: function(latlon) {
			pointarray.push(new google.maps.LatLng(latlon.latitude, latlon.longitude));
		}
	}

}(jQuery));