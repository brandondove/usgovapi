var petitionscache = require('./cache/petitionscache').create();

var petitiondetails = function(socket, petitionId) {

	petitionscache.getPetition(petitionId, function(err, data) {

		var petition = data;
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			created = new Date(petition.created * 1000),
			deadline = new Date(petition.deadline * 1000),
			issuetypes = petition.issues || [];

		socket.emit('title', petition.title);
		socket.emit('body', petition.body);
		socket.emit('url', petition.url);
		for (var i = 0; i < issuetypes.length; i++) {
			socket.emit('issue', issuetypes[i].name);
		}

		socket.emit('created', created.getDate() + ' ' + monthNames[created.getMonth()] + ' ' + created.getFullYear());
		socket.emit('deadline', deadline.getDate() + ' ' + monthNames[deadline.getMonth()] + ' ' + deadline.getFullYear());

		socket.emit('signatureCount', petition.signatureCount);
		socket.emit('signatureThreshold', petition.signatureThreshold);
		socket.emit('signaturesNeeded', petition.signaturesNeeded);

		socket.emit('progress', {
			progress: ((petition.signatureCount / petition.signatureThreshold) * 100),
			signatureCount: petition.signatureCount,
			signatureThreshold: petition.signatureThreshold,
			signaturesNeeded: petition.signaturesNeeded
		});

	});

}

exports.create = function(socket, petitionId) {
	return new petitiondetails(socket, petitionId);
}