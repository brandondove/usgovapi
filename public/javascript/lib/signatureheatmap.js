(function() {
	$(document).ready(function() {
		var consolediv = $('#console');
		var petitionid = $('#petitionId').val();
		var socket = io.connect('http://localhost');
		socket.emit('signatureheatmap', petitionid);
		socket.on('newlatlon', function(latlon) {
			var newspan = $(document.createElement('span')).text('New latlon: (' + latlon.latitude + ',' + latlon.longitude + ')');
			consolediv.append(newspan).append($(document.createElement('br')));
		});
	})
})();