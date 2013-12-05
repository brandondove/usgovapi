var wethepeople = require('./wethepeople').create();

var signaturestable = function(socket, petitionId, options) {
	wethepeople.getSignatures(petitionId, options, function(err, data) {
		data.results.forEach(function(result) {
			socket.emit('signature', result);
		})
	});
}

exports.create = function(socket, petitionId, options) {
	return new signaturestable(socket, petitionId, options);
}