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
	querystring = require('querystring'),
	fs = require('fs');

/*
 * Private members can be declared inside this function
 */
var wethepeople = function() {
	this.baseUrl = 'https://api.whitehouse.gov/v1/';
}

/*
 * 1) Make the HTTPS Request for the petitions.json api
 * 2) Execute the callback on the returned object.
 *
 * Note, one of the options is mock. If set to true, we will use some local
 * data instead of actually making a web request to the api. Usefule when
 * you are behind a proxy ;)
 */

wethepeople.prototype.getPetitions = function(callback, options) {

	var url = this.baseUrl + 'petitions.json',
		mock = false;

	//options and call back passed in, let's apply the options to the query string
	if (arguments.length === 2) {
		var numOptions = Object.keys(options).length;
		mock = options['mock'];
		delete options['mock'];
		url = (numOptions > 0) ? (url + '?' + querystring.stringify(options)) : url;
	}
	//otherwise, caller messed up.  
	else if (!(arguments.length === 1 && callback)) {
		throw new Error('Use either 1 parameter (a callback function to manipulate/save the data)' +
			', or 2 parameters (options which match the API & a callback)')
	}
	callPetitionsApi(url, callback, mock);
}

/*
 * 1) Make the HTTPS Request for the petitions/{petitionId}.json api
 * 2) Execute the callback on the returned object.
 *
 * Note, one of the options is mock. If set to true, we will use some local
 * data instead of actually making a web request to the api. Usefule when
 * you are behind a proxy ;)
 */
wethepeople.prototype.getPetition = function(petitionId, callback, mock) {

	var url = this.baseUrl + 'petitions/' + petitionId + '.json',
		mock = (mock) ? mock : false;

	callPetitionApi(url, callback, mock);
}

/*
 * For getting a list of Petitions and their Data
 */
var callPetitionsApi = function(url, callback, mock) {
	if (mock === true) {
		mockPetitionsApi(callback);
	} else {
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
}

/*
 * For getting a Single Petition's Data
 */
var callPetitionApi = function(url, callback, mock) {
	if (mock === true) {
		mockPetitionApi(callback);
	} else {
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
}

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

exports.wethepeople = wethepeople;

exports.create = function() {
	return new wethepeople();
};