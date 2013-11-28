/*
 * Author: adove
 *
 * A tool for "weighting" words based on the number of times they appear
 * in a string (or strings)
 *
 * We will default to breaking up the word by ' ', however, an optional parameter
 * can be passed into the create method to define a specific delimiter.
 */

var __ = require('underscore');

var wordcounter = function(delimiter) {
	this.delimiter = delimiter;
	this.countMap = [];
}

/**
 * 1) If passed a string, split on delimiter, count each word
 * 2) If passed an array, go through each element of the array, split the element on delim, count each word (recursively)
 */
wordcounter.prototype.count = function(input) {
	var that = this; //save scope here so that we can use members,etc. within these "forEach" callbacks
	if (__.isArray(input)) {
		//just call this recursively on each string in the array
		input.forEach(function(item) {
			that.count(item);
		});
	} else if (__.isString(input)) {
		var words = input.split(this.delimiter);
		words.forEach(function(word) {
			var cObj = __.findWhere(that.countMap, {
				'word': word
			});
			if (cObj === undefined) {
				cObj = {
					'word': word,
					'count': 1
				};
				that.countMap.push(cObj);
			} else cObj.count++;
		});
	} else {
		throw new Error('Can only count string occurrences in an array of strings or a single string.');
	}
}

/**
 * Get the count for a given string
 */
wordcounter.prototype.getCount = function(input) {
	if (__.isString(input)) {
		var cObj = __.findWhere(this.countMap, {
			'word': input
		});
		return cObj === undefined ? 0 : cObj.count;
	} else {
		throw new Error('Can only get counts for a string or a number.');
	}
}

/**
* Get the most frequently found word.
*
* If shouldPop param supplied, let's remove that object from the countMap
* so that we can get the next most frequent
*/
wordcounter.prototype.getMostFrequent = function(shouldPop) {
	var cObj = __.max(this.countMap, function(item) {
		return item.count;
	})
	if(shouldPop) this.countMap = __.without(this.countMap, cObj);
	return cObj === undefined ? '' : cObj.word;
}


exports.wordcounter = wordcounter;

exports.create = function(delimiter) {
	if (typeof delimiter === 'undefined')
		return new wordcounter(' ');
	else
		return new wordcounter(delimiter);
};