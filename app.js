/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	petitions = require('./routes/petitions'),
	petition = require('./routes/petition'),
	petitiondetails = require('./lib/petitiondetails'),
	petitionstable = require('./lib/petitionstable'),
	signaturestable = require('./lib/signaturestable'),
	signaturesheatmap = require('./lib/signaturesheatmap'),
	http = require('http'),
	path = require('path'),
	app = express(),
	httpApp = http.createServer(app),
	socketio = require('socket.io').listen(httpApp);

// all environments -- basic express setup
// default to http://localhost:3000
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/*
 * Request Handlers
 */
app.get('/', routes.index);
app.get('/petitions', petitions.index);
app.get('/petitions/:id', petition.index);
app.get('/petitions/signaturesheatmap/:id', petition.signaturesheatmap);

/*
 * Client-Server event listeners
 */
socketio.on('connection', function(socket) {

	socket.on('petitionstable', function() {
		petitionstable.create(socket, {});
	});

	socket.on('petitiondetails', function(petitionId) {
		petitiondetails.create(socket, petitionId);
	});

	socket.on('signaturesheatmap', function(petitionId) {
		signaturesheatmap.create(socket, petitionId, {});
	});

	socket.on('signaturestable', function(petitionId) {
		signaturestable.create(socket, petitionId, {});
	});

})

httpApp.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});