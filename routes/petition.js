/*
 * GET petitions page
 *
 * Let's make a call to the WeThePeople API to get our petitions so we can render them.
 */

var wethepeople = require('../lib/wethepeople').create();

exports.index = function(req, res) {
	var petition = undefined,
		petId = req.params.id,
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
					signatures: data.results
				});
			}
		};

	//this is forcing synchronization (and all within the scope of 1 request...)
	//we should be able to call this and getSignatures at the same time
	//and then provide the results once they are ready...
	//
	//it might be better to have wethepeople be an event emitter...
	//that way, we could just listen for events on both the client/server side
	//and make requests 
	wethepeople.getPetition(petId, petitionCallback, true);
};