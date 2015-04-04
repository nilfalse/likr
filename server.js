var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
// logger
app.use(require('morgan')('combined'));
// parse application/json 
app.use(require('body-parser').json());


io.on('connection', function(socket){
  console.log('a user connected');
});

app.get('/', function(req, res) {
	res.send({ response: 'hello' });
});

var server = app.listen(process.env.PORT || 3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening at http://%s:%s', host, port)
});

