var wethepeople = require('../lib/wethepeople').create();

describe("wethepeople", function(){

	it("should limit petitions", function(){
		var petitions = undefined;
		var called = false;
		var limit = 5;

		var options = { limit : limit };
		var callback = function(petitionData){
			petitions = petitionData;
			called = true;
		};

		//execute the getPetitions method, it will call our callback once the data is ready
		runs(function(){
			wethepeople.getPetitions(callback, options);
		});

		waitsFor(function(){
			return called;
		}, 'Petitions to be returned', 2000);

		runs(function(){
			expect(called).toBe(true);
			expect(petitions.metadata).toBeDefined();
			expect(petitions.results.length).toBe(limit);	
		});
		
	});

	it("should mock data", function(){
		var petitions = undefined;
		var called = false;

		var options = { mock : true };
		var callback = function(err, petitionData){
			petitions = petitionData;
			called = true;
		};

		//execute the getPetitions method, it will call our callback once the data is ready
		runs(function(){
			wethepeople.getPetitions(callback,options);
		});

		waitsFor(function(){
			return called;
		}, 'Petitions to be returned', 2000);

		runs(function(){
			expect(called).toBe(true);
			expect(petitions.metadata).toBeDefined();
			expect(petitions.results.length).toBe(3);	
		});
		
	});

});