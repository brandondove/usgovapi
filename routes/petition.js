/*
 * GET petitions page
 *
 * Let's make a call to the WeThePeople API to get our petitions so we can render them.
 */

var wethepeople = require('../lib/wethepeople').create();

exports.index = function(req, res) {
	var petition = undefined,
	var petId = req.params.id,
		petitionCallback = function(err, data) {
			if (err) {
				res.render('error', {
					message: 'error connecting to WeThePeople API, is the service up? Are you behind a proxy?'
				});
			} else {
				petition = data.results[0];
				wethepeople.getSignatures(petId, {}, signaturesCallback, true);
			}
		},
		signaturesCallback = function(err, data) {
			if (err) {
				res.render('error', {
					message: 'error connecting to WeThePeople API, is the service up? Are you behind a proxy?'
				});
			} else {
				res.render('petition', {
					petId: petId,
					petition: petition,
					signatures:data.results
				});
			}
		};

	wethepeople.getPetition(petId, petitionCallback, true);
};