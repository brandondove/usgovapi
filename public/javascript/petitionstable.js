(window.badove.petitionstable = function($) {

	var table = undefined,
		tablebody = undefined;

	return {
		init: function(_tableid, callback) {
			$.Mustache.load('/templates/petitionstable.html');
			table = $('#' + _tableid);
			tablebody = table.find('tbody');
			callback();
		},
		addPetition: function(petition) {
			var rowdata = {
				id: petition.id,
				title: petition.title
			}
			tablebody.mustache('petition-row', rowdata, {
				method: 'append'
			});
		}
	}


}(jQuery));