var _ = require('underscore');
var uuid = require('node-uuid');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var Types = mongoose.Types;
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
				description = 'name has already been taken';
			} else {
				status = 400;
				description = err;
			}
			res.status(status).send({error: {description: description}});
			return;
		}
		res.send({token: user._id});
	});
});

app.get('/games', function(req, res) {
	models.Game.find(function(err, games) {
		if (err) {
			console.error(err);
			res.status(400).send({error: {description: 'something went wrong'}});
			return;
		}

		res.send({games: games});
	});
});

app.post('/games', function(req, res) {
	var game = new models.Game(req.body);
	game.save(function(err, game) {
		if (err) {
			console.error(err);
			res.status(400).send({error: {description: 'something went wrong'}});
			return;
		}

		res.send(game);
	});
});

app.post('/games/:id/answers', function(req, res) {
	console.log(req.params);
	models.Game.findOne({_id: new Types.ObjectId(req.params.id)}, function(err, game) {
		if (err) {
			console.error(err);
			res.status(400).send({error: {description: 'something went wrong'}});
			return;
		}
		if (!game) {
			res.status(404).send({error: {description: 'game not found'}});
			return;
		}

		models.Question.findOne({_id: new Types.ObjectId(req.body.question_id)}, function(err, question) {
			if (err) {
				console.error(err);
				res.status(400).send({error: {description: 'something went wrong'}});
				return;
			}
			if (!question) {
				res.status(404).send({error: {description: 'question not found'}});
				return;
			}

			var answer = _(question.available_answers).findWhere({_id: req.body.answer_id});
			if (!answer) {
				res.status(404).send({error: {description: 'answer not found'}});
				return;
			}
		});
	});
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	var port = process.env.PORT || 3000;
	http.listen(port, function() {
		console.log('listening to port', port);
		// var question = new models.Question({
		// 	available_answer: [
		// 		{pic_url: 'http://placehold.it/300x150'},
		// 		{pic_url: 'http://placehold.it/300x150'}
		// 	]
		// });
		// question.save();
	});
});
mongoose.connect('mongodb://localhost/likr');

