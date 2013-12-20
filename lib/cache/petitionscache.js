var cache = require('./cache'),
	wethepeople = require('../wethepeople').create();

function pcache() {
	this.cache = cache.get();
}

pcache.prototype.getPetitions = function(options, callback, mock) {
	//start by checking the database
	//if nothing, call the api, and save to database, then return results
	return wethepeople.getPetitions(options, callback, mock);
}

pcache.prototype.getPetition = function(petitionId, callback, mock) {
	var pdb = this.cache.getdb();
	pdb.open(function(err, db) {
		if (err) {
			//handle error
			//console.log('error');
			//if issue with database, just call the api...
			wethepeople.getPetition(petitionId, callback, mock);
		} else {
			//okay... we are connected
			//console.log('success!');
			//this will create/grab the existing collection
			pdb.createCollection('petitions', function(err, collection) {

				//find the petition id
				var pcur = collection.find({
					id: petitionId
				});

				//give me the first matching object in this cursor
				//null if none matches
				pcur.nextObject(function(err, petition) {
					if (petition != null) {
						//console.log("Petition found in db: " + petition);
						//okay, do the callback on the object returned by the database
						callback(err, petition);
						pdb.close();
					} else {
						//console.log('not found in database, hitting api');
						//create a new callback so that we can insert the results from the api call
						//into the database, then we can call the callers callback on the newly inserted document
						wethepeople.getPetition(petitionId, function(err, apiResult) {	
							var petition = apiResult.results[0];
							collection.insert(petition, function(err, docs){
								//console.log('finished inserting petition, calling callback');
								callback(err, docs[0]);
								pdb.close();
							});
						}, mock);
					}
				});
			});
		}
	});
}

exports.create = function() {
	return new pcache();
}