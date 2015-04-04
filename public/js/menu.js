var socket = io();

socket.on('games', function(games) {
	var template = _($('#gameListItem').html()).template();
	var gamesHtml = games.map(function(game) {
		return template(game);
	}).join("\n");
	$('#gameList').html(gamesHtml);
});

$('#newGameButton').on('click', function(e) {
	var gameName = $('#gameName').val();
	socket.emit('create game', {
		name: gameName
	});
	console.log(gameName);
	e.preventDefault();
});

// $('#gameList').on('click', function(e) {
// 	console.log(e.target.href);
// 	e.preventDefault();
// });

