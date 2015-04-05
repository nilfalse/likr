function showCreateGame() {
	location.href="createGame.html";
}

function showJoinGame() {
	location.href="joinGame.html";
}

$(document).ready(function() {
	$('#createButton').click(function() {
		showCreateGame();
	});
	
	$('#joinButton').click(function() {
		showJoinGame();
	});
});