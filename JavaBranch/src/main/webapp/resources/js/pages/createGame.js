function showPreparePage() {
	location.href = "preparePage.html";
}

function joinGame(gameId) {
	var params = "gameId=" + gameId;
	$.ajax({
		type : 'POST',
		url : "rest/user/connect",
		cache : false,
		data : params,
		success : function(data) {
			if (data) {
				showPreparePage();
			} else {
				$("#error").show();
			}
		}
	});
}

function createGame() {
	var gameName = $("#gameName").val();
	var params = "name=" + gameName;
	$.ajax({
		type : 'POST',
		url : "rest/game/create",
		cache : false,
		data : params,
		success : function(game) {
				joinGame(game.id);
		}
	});
}

$(document).ready(function() {
	$('#createButton').click(function() {
		createGame();
	});
});