/*
 * Author: adove
 *
 * A tool for "weighting" words based on the number of times they appear
 * in a string (or strings)
 *
 * We will default to breaking up the word by ' ', however, an optional parameter
 * can be passed into the create method to define a specific delimiter.
 */

var util = require('util'),
	__ = require('underscore');

var wordcounter = function(delimiter) {
	this.delimiter = delimiter;
	this.countMap = [];
}

/**
 * 1) If passed a string, split on delimiter, count each word
 * 2) If passed an array, go through each element of the array, split the element on delim, count each word
 */
wordcounter.prototype.count = function(input) {
	var that = this; //save scope here so that we can use members,etc. within these "forEach" callbacks
	if (util.isArray(input)) {
		//just call this recursively on each string in the array
		input.forEach(function(item){
			that.count(item);
		});
	} else if (typeof input === 'string') {
		var words = input.split(this.delimiter);
		words.forEach(function(word){
			var cObj = __.findWhere(that.countMap, {'word':word});
			if(cObj === undefined) {
				cObj = {'word':word,'count':1};
				that.countMap.push(cObj);
			}
			else cObj.count++;
		});		
	} else {
		throw new Error('Can only count string occurrences in an array of strings or a single string.');
	}
}

/**
 * 1) If passed a string, get the count for that string
 * 2) If passed an integer, get the nth highest counted word
 *	-- e.g if 1 is passed in, give me the highest counted word
 * 	-- if 2 is passed in, give me the second highest counted word
 * 	-- etc.
 */
wordcounter.prototype.getCount = function(input) {
	if (typeof input === 'string') {
		var cObj = __.findWhere(this.countMap, {'word':input});
		return cObj === undefined ? 0 : cObj.count;
	} else if (typeof input === 'number') {
		var cObj = __.max(this.countMap, function(item){
			return item.count;
		})
		return cObj === undefined ? '' : cObj.word;
	} else {
		throw new Error('Can only get counts for a string or a number.');
	}
}


exports.wordcounter = wordcounter;

exports.create = function(delimiter) {
	if (typeof delimiter === 'undefined')
		return new wordcounter(' ');
	else
		return new wordcounter(delimiter);
};