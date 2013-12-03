var wethepeople = require('./wethepeople').create();

var signaturetable = function(socket, petitionId, options) {
	wethepeople.getSignatures(petitionId, options, function(err, data) {
		data.results.forEach(function(result) {
			socket.emit('signature', {
				signature: result
			});
		})
	});
}

exports.create = function(socket, petitionId, options) {
	return new signatureheatmap(socket, petitionId, options);
}