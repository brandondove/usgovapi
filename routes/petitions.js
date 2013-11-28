/*
 * GET petitions page
 *
 * Let's make a call to the WeThePeople API to get our petitions so we can render them.
 * What if we cache the petition data now and then call for it in the getPetition(id) method?
 * That way, we don't need make another call the the WeThePeople API?
 */

var wethepeople = require('../lib/wethepeople').create();

exports.index = function(req, res) {

	var callback = function(err, data) {
		if (err) {
			res.render('error', {
				message: 'error connecting to WeThePeople API, Is the service up? Are you behind a proxy?'
			});
		} else {
			res.render('petitions', {
				title: 'Petitions',
				petitions: data.results
			});
		}
	};

	wethepeople.getPetitions({}, callback);
};