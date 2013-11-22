/*
 * GET petitions page
 *
 * Let's make a call to the WeThePeople API to get our petitions so we can render them.
 */

var wethepeople = require('../lib/wethepeople').create();

exports.index = function(req, res) {
	wethepeople.getPetitions(function(data) {
		res.render('petitions', {
			title: 'Petitions',
			petitions: data.results
		});
	});

};