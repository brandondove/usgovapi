$(document).ready(function() {
	var petitionid = $('#petitionId').val(),
		socket = io.connect('http://localhost'),
		signaturesheatmap = window.badove.signaturesheatmap;

	signaturesheatmap.init('map-canvas', function() {
		socket.emit('signaturesheatmap', petitionid);
		socket.on('latlon', signaturesheatmap.addLatLonPoint);
	});

})