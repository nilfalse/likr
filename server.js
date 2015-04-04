var _ = require('underscore');
var uuid = require('node-uuid');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var models = require('./models');

app.use(express.static('public'));
// logger
app.use(require('morgan')('combined'));
// parse application/json 
app.use(require('body-parser').json());

app.get('/', function(req, res) {
	res.send({response: 'hello'});
});

app.post('/users', function(req, res) {
	if (!req.body.name) {
		res.status(400).send({error: {descr: 'name is required'}});
		return;
	}
	var user = new models.User({name: req.body.name});
	user.save(function(err, user) {
		var status, description;
		if (err) {
			if (11000 === err.code) {
				status = 409;
				description = 'name is already taken';
			} else {
				status = 400;
				description = err;
			}
			res.status(status).send({error: {description: description}});
			return;
		}
		res.send({success: true, token: user._id});
	});
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	var port = process.env.PORT || 3000;
	http.listen(port, function() {
		console.log('listening to port', port);
	});
});
mongoose.connect('mongodb://localhost/likr');

