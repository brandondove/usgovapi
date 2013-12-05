/*
 * GET petitions page
 *
 * Let's make a call to the WeThePeople API to get our petitions so we can render them.
 * What if we cache the petition data now and then call for it in the getPetition(id) method?
 * That way, we don't need make another call the the WeThePeople API?
 */

var wethepeople = require('../lib/wethepeople').create();

exports.index = function(req, res) {
	res.render('petitions', {
		title: '( Petitions )',
		page_title: 'Petitions'
	});
};