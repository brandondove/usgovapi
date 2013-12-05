/*
 * GET home page
 *
 * Here, we can handle sending parameters from the request to the response (if there was a form, or we needed to do some db work, etc.)
 */

exports.index = function(req, res) {

	res.render('index', {
		title: ''
	});

};
