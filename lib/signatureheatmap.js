var wethepeople = require('./wethepeople').create(),
	geocoderProvider = 'google',
	httpAdapter = 'http',
	geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, {});

var signatureheatmap = function(socket, petitionId) {
	wethepeople.getSignatures(petitionId, {}, function(err, data) {
		data.results.forEach(function(result) {
			geocoder.geocode(result.zip, function(err, res) {
				if (res[0]) {
					socket.emit('newlatlon', {
						latitude: res[0].latitude,
						longitude: res[0].longitude
					});
				}
			});
		})
	});
}

exports.create = function(socket, petitionId) {
	return new signatureheatmap(socket, petitionId);
}