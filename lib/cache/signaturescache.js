var cache = require('./cache'),
	wethepeople = require('../wethepeople').create();

var scache = function() {
	this.cache = cache.get();
}

scache.prototype.getSignatures = function(petitionId, options, callback, mock) {
	//start by checking the database
	//if nothing, call the api, and save to database, then return results
	return wethepeople.getSignatures(petitionId, options, callback, mock);
}

exports.create = function() {
	return new scache();
}