/* SETUP */

// Express
var express	= require('express');
var app		= express();
PORT		= 3131;

// Database
var db = require('./db-connector')


/* ROUTES */

app.get('/', function(req, res) {

	//db.pool.query(query, function(err, results, fields) {});
	//res.send();

});
    
    
/* LISTENER */

app.listen(PORT, function(){
	console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
