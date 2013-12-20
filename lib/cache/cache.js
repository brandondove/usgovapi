var mdb = require('mongodb').Db,
	server = require('mongodb').Server;

var cache = function() {

	this.dbnamespace = 'test';
	this.server = '127.0.0.1';
	this.port = 27018;

}

cache.prototype.getdb = function(){
	if(this.db === undefined){
		console.log("creating new db");
		this.db = new mdb(this.dbnamespace, new server(this.server, this.port));
	}
	return this.db;
}

exports.get = function() {
	return new cache();
}