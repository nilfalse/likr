var socket = io();

socket.emit("game join", getQueryParams("gameId"));

socket.on("game joined", function(game) {
	$('#gameHeader').html(game.name);
	console.log(game.players);
});

socket.on("player joined", function(player) {
	var template = _($('#playerItemTemplate').html()).template();
	var playerHtml = template(player);
	$('#playerList').append(playerHtml);
});

socket.on("error", function(error) {
	console.error(error);
});