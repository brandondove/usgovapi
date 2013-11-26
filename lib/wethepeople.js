/*
 * Author: adove
 *
 * An interface for calling the WeThePeople API.
 *
 * See https://petitions.whitehouse.gov/developers for information on which options can be passed through to the API
 * -- example:
 *	{ limit: 10, createdAfter: 651744000 }
 *
 * Our function(s) will not return data, rather they will allow for a callback to be made on the object 
 * returned from the HTTP request.
 *
 * callback function prototype:
 * function(err, data){ //doStuff with err/data }
 * - err will be null when no error happened
 * - data will be null when error happened
 *
 * Note, each function has a parameter called mock. If set to true, we will use some local
 * data instead of actually making a web request to the api. Useful when you are behind a proxy ;)
 *
 */

var https = require('https'),
	querystring = require('querystring'),
	fs = require('fs');

var wethepeople = function() {
	this.baseUrl = 'https://api.whitehouse.gov/v1/';
}

/*
 * Get a list of Petitions and their Data
 */

wethepeople.prototype.getPetitions = function(options, callback, mock) {

	var url = this.baseUrl + 'petitions.json',
		mock = (mock) ? mock : false;

	//options and call back passed in, let's apply the options to the query string
	var numOptions = Object.keys(options).length;
	url = (numOptions > 0) ? (url + '?' + querystring.stringify(options)) : url;

	callPetitionsApi(url, callback, mock);
}

/*
 * Get a Single Petition's Data
 */
wethepeople.prototype.getPetition = function(petitionId, callback, mock) {

	var url = this.baseUrl + 'petitions/' + petitionId + '.json',
		mock = (mock) ? mock : false;

	callPetitionApi(url, callback, mock);
}

/*
 * Get a Signatures attached to a petition
 */
wethepeople.prototype.getSignatures = function(petitionId, options, callback, mock) {

	var url = this.baseUrl + 'petitions/' + petitionId + '/signatures.json',
		mock = (mock) ? mock : false;

	//options and call back passed in, let's apply the options to the query string
	var numOptions = Object.keys(options).length;
	url = (numOptions > 0) ? (url + '?' + querystring.stringify(options)) : url;

	callSignatureApi(url, callback, mock);
}

/*
 * Handle logic for calling/mocking API
 */
var callPetitionsApi = function(url, callback, mock) {
	if (mock === true) {
		mockPetitionsApi(callback);
	} else {
		callApi(url, callback);
	}
}

var callPetitionApi = function(url, callback, mock) {
	if (mock === true) {
		mockPetitionApi(callback);
	} else {
		callApi(url, callback);
	}
}

var callSignatureApi = function(url, callback, mock) {
	if (mock === true) {
		mockSignatureApi(callback);
	} else {
		callApi(url, callback);
	}
}

/*
 * 1) Make the HTTPS Request
 * 2) Execute the callback on the returned object.
 *	- if there is an error, we will pass null for the "data" param of the callback and forward the err
 *	- if not, we will pass null for the "err" param of the callback and forward the output object as the "data" param
 */
var callApi = function(url, callback) {

	https.get(url, function(result) {
		var output = "";

		result.on('data', function(data) {
			output += data;
		});

		result.on('end', function() {
			var outputObj = JSON.parse(output);
			//no errors, return the data as an object
			callback(null, outputObj);
		});

	}).on('error', function(err) {
		//error, therefore data is null
		callback(err, null);
	});

}

/*
 * Mock APIs so we can test without making HTTPS Requests.
 */
var mockPetitionsApi = function(callback) {
	fs.readFile('data/mock-petitions.json', function(err, data) {
		var mockObj = JSON.parse(data);
		callback(err, mockObj);
	});
}

var mockPetitionApi = function(callback) {
	fs.readFile('data/mock-petition.json', function(err, data) {
		var mockObj = JSON.parse(data);
		callback(err, mockObj);
	});
}

var mockSignatureApi = function(callback) {
	fs.readFile('data/mock-signatures.json', function(err, data) {
		var mockObj = JSON.parse(data);
		callback(err, mockObj);
	});
}

exports.wethepeople = wethepeople;

exports.create = function() {
	return new wethepeople();
};