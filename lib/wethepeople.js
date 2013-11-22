/*
 * Author: adove
 *
 * An interface for calling the WeThePeople API.
 *
 * Our function will not return data, rather it will allow for a callback to be made on the object returned from the HTTP request.
 *
 * See https://petitions.whitehouse.gov/developers for information on which options can be passed through to the API
 * -- example:
 *	{ limit: 10, createdAfter: 651744000 }
 *
 * Callback function will be of the form function(data){ } where data is just an object
 *
 */

var https = require('https'),
	querystring = require('querystring');

/*
 * Private members can be declared inside this function
 */
var wethepeople = function() {
	this.baseUrl = 'https://api.whitehouse.gov/v1/';
}

/*
 * 1) Make the HTTPS Request for the petitions.json api
 * 2) Execute the callback on the returned object
 */

wethepeople.prototype.getPetitions = function(callback, options) {

	var url = this.baseUrl + 'petitions.json';

	//just a callback passed in... no options just make default call
	if (arguments.length === 1 && callback) {
		callApi(url, callback);
	}
	//options and call back passed in, let's apply the options to the query string
	else if (arguments.length === 2) {
		var numOptions = Object.keys(options).length;
		url = (numOptions > 0) ? (url + '?' + querystring.stringify(options)) : url;
	}
	//otherwise, caller messed up.  
	else {
		throw new Error('Use either 1 parameter (a callback function to manipulate/save the data), or 2 parameters (options which match the API & a callback)')
	}

	callApi(url, callback);
}

var callApi = function(url, callback) {
	https.get(url, function(result) {
		var output = "";

		result.on('data', function(data) {
			output += data;
		});

		result.on('end', function() {
			var outputObj = JSON.parse(output);
			callback(outputObj);
		});

	}).on('error', function(err) {
		throw err;
	});
}

exports.wethepeople = wethepeople;

exports.create = function() {
	return new wethepeople();
};