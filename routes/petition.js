/*
 * GET petitions page
 *
 * Let's make a call to the WeThePeople API to get our petitions so we can render them.
 */

var wethepeople = require('../lib/wethepeople').create();

exports.index = function(req, res) {
	res.render('petition', {
		title: "( Petition Detail )",
		page_title: "Petition Detail",
		petitionId: req.params.id
	});
};

exports.signaturesheatmap = function(req, res) {
	res.render('signatureheatmap', {
		title: '( Petition Detail: Signature Heat Map )',
		page_title: 'Petition Detail: Signature Heat Map',
		petitionId: req.params.id
	});
}