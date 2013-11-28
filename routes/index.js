/*
 * GET home page
 *
 * Here, we can handle sending parameters from the request to the response (if there was a form, or we needed to do some db work, etc.)
 */

var mongo = require('mongodb').MongoClient;

exports.index = function(req, res) {

	mongo.connect('mongodb://127.0.0.1:27017', function(err, db) {

		if (err) {

			res.render('error', {
				message: 'error connecting to database, is the database server running?'
			});

		} else {

			//create the collection if it doesn't exist
			//cap it at 10 records max... This will work like a queue
			//first in, first out (so oldest record will be removed when cap is reached)
			var collection = db.createCollection('testdb', {
				'capped': true,
				'size': 10,
				'max': 10
			}, function(err, col) {

				//just insert a new element upon each request
				col.insert({
					'accessDate': new Date().toISOString()
				}, function(err, docs) {
					console.log(req);
				});

				//get all results, convert it to an array, then render the response.
				col.find().toArray(function(err, results) {
					res.render('index', {
						title: '',
						dynamiccontent: results
					});
				});

			});

		}

	});

};
