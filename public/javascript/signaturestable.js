(window.badove.signaturestable = function($) {
	var table = undefined,
		tablebody = undefined;

	return {
		init: function(_tableid, callback) {
			$.Mustache.load('/templates/signaturestable.html');
			table = $('#' + _tableid);
			tablebody = table.find('tbody');
			callback();
		},
		addSignature: function(_signature) {
			var rowdata = {
				name: _signature.name,
				zip: _signature.zip,
				city: _signature.city,
				state: _signature.state,
				created: function() {
					return new Date(_signature.created * 1000).toString();
				}
			}
			tablebody.mustache('signature-row', rowdata, {
				method: 'append'
			});
		}
	};

}(jQuery));