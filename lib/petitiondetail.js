var wethepeople = require('./wethepeople').create();

var petitiondetail = function(socket, petitionId) {
	wethepeople.getPetition(petitionId, function(err, data) {
		var petition = data.results[0];
		socket.emit('title', petition.title);
		socket.emit('body', petition.body);
		socket.emit('url', petition.url);
		var issuetypes = petition.issues;
		for(var i=0; i < issuetypes.length; i++){
			socket.emit('issue', issuetypes[i].name);
		}
		//emit other events for other pieces of data here
	}, true);
}

exports.create = function(socket, petitionId) {
	return new petitiondetail(socket, petitionId);
}