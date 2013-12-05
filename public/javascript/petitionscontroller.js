jQuery(document).ready(function() {
	var socket = io.connect('http://localhost'),
		petitionstable = window.badove.petitionstable;

	petitionstable.init('petitions', function() {
		socket.on('petition', petitionstable.addPetition);
		socket.emit('petitionstable');
	});

});