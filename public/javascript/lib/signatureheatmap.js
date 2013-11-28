(function() {
	var signatureheatmap = (function() {
		var map, pointarray, heatmap;

		return {
			init: function(mapid) {
				var mapOptions = {
					zoom: 3,
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
			},
			addLatLonPoint: function(latitude, longitude) {
				pointarray.push(new google.maps.LatLng(latitude, longitude));
			}
		}
	})();

	$(document).ready(function() {
		//var consolediv = $('#console');
		var petitionid = $('#petitionId').val();
		var socket = io.connect('http://localhost');

		signatureheatmap.init('map-canvas');

		socket.emit('signatureheatmap', petitionid);
		socket.on('newlatlon', function(latlon) {
			//var newspan = $(document.createElement('span')).text('New latlon: (' + latlon.latitude + ',' + latlon.longitude + ')');
			//consolediv.append(newspan).append($(document.createElement('br')));

			signatureheatmap.addLatLonPoint(latlon.latitude, latlon.longitude);
		});
	})
})();