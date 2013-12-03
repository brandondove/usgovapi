var wethepeople = require('./wethepeople').create();

var petitionstable = function(socket, options) {
	wethepeople.getPetitions(options, function(err, data) {
		data.results.forEach(function(result) {
			socket.emit('newpetition', {
				petition: result
			});
		})
	}, true);
}

exports.create = function(socket, options) {
	return new petitionstable(socket, options);
}