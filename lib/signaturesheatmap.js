var wethepeople = require('./wethepeople').create(),
	geocoderProvider = 'google',
	httpAdapter = 'http',
	geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, {});

var signaturesheatmap = function(socket, petitionId, options) {
	wethepeople.getSignatures(petitionId, options, function(err, data) {
		data.results.forEach(function(result) {
			geocoder.geocode(result.zip, function(err, res) {
				if (res[0]) {
					socket.emit('latlon', {
						latitude: res[0].latitude,
						longitude: res[0].longitude
					});
				}
			});
		})
	});
}

exports.create = function(socket, petitionId, options) {
	return new signaturesheatmap(socket, petitionId, options);
}