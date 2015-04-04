var socket = io();

socket.on('games', function(games) {
	var template = _($('#gameItemTemplate').html()).template();
	var gamesHtml = games.map(function(game) {
		return template(game);
	}).join("\n");
	$('#gameList').html(gamesHtml);
});

function createNewGame(e) {
	var gameName = $('#gameName').val();
	socket.emit('game create', {
		name: gameName
	});
	console.log(gameName);	
	e.preventDefault();
}

$('#newGameButton').on('click', createNewGame);

$("#gameName").keyup(function (e) {
    if (e.keyCode == 13) {
        createNewGame(e);
    }
});

socket.on('game created', function(game) {
	location.href = "/game.html?gameId=" + game._id;
});