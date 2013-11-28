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
				wethepeople.getSignatures(petId, {}, signaturesCallback);
			}
		},
		signaturesCallback = function(err, data) {
			if (err) {
				res.render('error', {
					message: 'error connecting to WeThePeople API, is the service up? Are you behind a proxy?'
				});
			} else {
				var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
				var created = new Date(petition.created*1000);
				var deadline = new Date(petition.deadline*1000);
				res.render('petition', {
					title: "( Petition Detail )",
					page_title: "Petition Detail",
					petId: petId,
					petition: petition,
					petition_created: created.getDate() + ' ' + monthNames[created.getMonth()] + ' ' + created.getFullYear(),
					petition_deadline: deadline.getDate() + ' ' + monthNames[deadline.getMonth()] + ' ' + deadline.getFullYear(),
					progress_pct: (petition.signatureCount / petition.signaturesNeeded) * 100,
					signatures: data.results
				});
			}
		};

	/*
	 * this is forcing synchronization (and all within the scope of 1 request...)
	 * we should be able to call this and getSignatures at the same time
	 * and then provide the results once they are ready...
	 *
	 * we might be able to cache requests/results (by the options provided for the request)
	 * and then just serve them up without needing to go out to the API again...
	 *
	 * finally, it might be better to have wethepeople be an event emitter...
	 * that way, we could just listen for events on both the client/server side
	 * and respond with data when it is ready.
	 */
	wethepeople.getPetition(petId, petitionCallback);
};

exports.signatureheatmap = function(req, res) {
	res.render('signatureheatmap', {
		title: 'Petitions: Signature Heat Map',
		petitionId: req.params.id
	});
}
