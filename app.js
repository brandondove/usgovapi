/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	petitions = require('./routes/petitions'),
	petition = require('./routes/petition'),
	http = require('http'),
	path = require('path');

var app = express();

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

app.get('/', routes.index);
app.get('/petitions', petitions.index);
app.get('/petitions/:id', petition.index);

var httpApp = http.createServer(app);

httpApp.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
