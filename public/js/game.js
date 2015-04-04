var socket = io();

socket.emit("game join", getQueryParams("_id"));

socket.on("player joined", function(player) {
	var template = _($('#playerItemTemplate').html()).template();
	var playerHtml = template(player);
	$('#playerList').append(playerHtml);

});