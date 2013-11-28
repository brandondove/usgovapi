var wordcounter = require('../lib/wordcounter');

describe("wordcounter", function() {
	var counter;

	beforeEach(function() {
		counter = wordcounter.create();
	});

	afterEach(function() {
		
	});

	it("should count words in a string", function() {
		counter.count('hello bob hello');
		expect(counter.getCount('hello')).toBe(2);
	});

	it("should not count words that aren't in a string", function() {
		counter.count('hello hello');
		expect(counter.getCount('bob')).toBe(0);
	});

	it("should count words in an array of strings", function() {
		counter.count(['hello world', 'my name is bob', 'hello bob']);
		expect(counter.getCount('bob')).toBe(2);
		expect(counter.getCount('world')).toBe(1);
	});

	it("should update it's word counts with successive calls to count", function() {
		counter.count('hello world hello');
		expect(counter.getCount('hello')).toBe(2);
		counter.count('hello');
		expect(counter.getCount('hello')).toBe(3);
	});

	it("should return the highest counted word and leave the highest counted word there", function() {
		counter.count('hello world hello');
		expect(counter.getMostFrequent()).toBe('hello');
	});

	it("should return the highest counted word and remove the highest counted word there", function() {
		counter.count('hello world hello');
		expect(counter.getMostFrequent(true)).toBe('hello');
		expect(counter.getMostFrequent(true)).toBe('world');
	});

});