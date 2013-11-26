var wethepeople = require('../lib/wethepeople').create();

/* 
 * Since we are mocking the API call, we know what the data should be
 * this will allow us to do more in depth testing without worrying about
 * whether or not the API is available.
 */

describe("wethepeople", function() {

	var called,
		mock = true,
		testPetitionId = '50cb6d2ba9a0b1c52e000017';

	beforeEach(function() {
		called = false;
	});

	afterEach(function() {
		called = false;
	});

	it("should get petitions", function() {
		var petitions = undefined,
			options = {},
			callback = function(err, data) {
				petitions = data;
				called = true;
			};

		//execute the getPetitions method, it will call our callback once the data is ready
		runs(function() {
			wethepeople.getPetitions(options, callback, mock);
		});

		waitsFor(function() {
			return called;
		}, 'Petitions to be returned', 2000);

		runs(function() {
			expect(called).toBe(true);
			expect(petitions.metadata).toBeDefined();
			expect(petitions.results.length).toBe(3);
		});

	});

	it("should get a petition", function() {
		var petition = undefined,
			options = {},
			callback = function(err, data) {
				petition = data;
				called = true;
			};

		//execute the getPetition method, it will call our callback once the data is ready
		runs(function() {
			wethepeople.getPetition(testPetitionId, callback, mock);
		});

		waitsFor(function() {
			return called;
		}, 'A Petition to be returned', 2000);

		runs(function() {
			expect(called).toBe(true);
			expect(petition.metadata).toBeDefined();
			expect(petition.results.length).toBe(1);
		});

	});

	it("should get signatures for a petition", function() {
		var signatures = undefined,
			options = {},
			callback = function(err, data) {
				signatures = data;
				called = true;
			};

		//execute the getSignatures method, it will call our callback once the data is ready
		runs(function() {
			wethepeople.getSignatures(testPetitionId, options, callback, mock);
		});

		waitsFor(function() {
			return called;
		}, 'Signatures to be returned', 2000);

		runs(function() {
			expect(called).toBe(true);
			expect(signatures.metadata).toBeDefined();
			expect(signatures.results.length).toBe(16);
		});

	});

});