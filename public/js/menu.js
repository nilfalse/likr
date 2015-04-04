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
	socket.emit('game create', {
		name: gameName
	});
	console.log(gameName);	
	e.preventDefault();

});


socket.on('game created', function(game) {
	location.href = "/game.html?gameId=" + game._id;
});
// $('#gameList').on('click', function(e) {
// 	console.log(e.target.href);
// 	e.preventDefault();
// });

