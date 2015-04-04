var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
// logger
app.use(require('morgan')('combined'));
// parse application/json 
app.use(require('body-parser').json());

var gamesList = [];

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
	});

	socket.emit('games', gamesList);
	socket.on('create game', function(game) {
		gamesList.push(game);
		console.log('user created game');
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

