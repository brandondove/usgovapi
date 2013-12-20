var petitionscache = require('./cache/petitionscache').create();

var petitionstable = function(socket, options) {
	petitionscache.getPetitions(options, function(err, data) {
		data.results.forEach(function(result) {
			socket.emit('petition', result);
		})
	});
}

exports.create = function(socket, options) {
	return new petitionstable(socket, options);
}