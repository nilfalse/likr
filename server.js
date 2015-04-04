var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
// logger
app.use(require('morgan')('combined'));
// parse application/json 
app.use(require('body-parser').json());

var questions = [];

var gameList = [];

function Game(data) {
	data._id = gameList.length;
	return data;
}

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
	});

	socket.emit('games', gameList);
	socket.on('create game', function(data) {
		gameList.push(new Game(data));
		console.log('new game', gameList);
		console.log('user created game');
		io.emit('games', gameList);
	});
	socket.on('join game', function(game) {
		console.log('user joined game');
	});
});

app.get('/', function(req, res) {
	res.send({ response: 'hello' });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
	console.log('listening to port', port);
});

