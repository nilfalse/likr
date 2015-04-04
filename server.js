var _ = require('underscore');
var uuid = require('node-uuid');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
// logger
app.use(require('morgan')('combined'));
// parse application/json 
app.use(require('body-parser').json());

var questions = require('./questions.json');

var gameList = [];

function Game(data) {
	_(this).extend(data, {
		_id: uuid.v4()
	});
}

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
	});

	socket.emit('games', gameList);
	socket.on('game create', function(data) {
		var game = new Game(data);
		gameList.push(game);
		socket.emit('game created', game);
		io.emit('games', gameList);
	});

	socket.on('game join', function(game) {
		socket.join(game._id);
	});
});

app.get('/', function(req, res) {
	res.send({ response: 'hello' });
});

var port = process.env.PORT || 3000;
http.listen(port, function() {
	console.log('listening to port', port);
});

