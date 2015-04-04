var socket = io();

socket.on('games', function(games) {
	var template = _($('#gameListItem').html()).template();
	var gamesHtml = games.map(function(game) {
		return template(game);
	}).join("\n");
	$('#gameList').html(gamesHtml);
});

$('#gameList').on('click', function(e) {
	console.log(e.target.href);
	e.preventDefault();
});

