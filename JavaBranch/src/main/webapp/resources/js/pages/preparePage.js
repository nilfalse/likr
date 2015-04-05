function showPlayerList(list) {
	if (!list.length) {
		return;
	}
	$("#playerList").html("");
	$("#playerList").append('<ul class="list-group">');
	$.each(list, function(index, value) {
		$("#playerList").append(
				'<li class="list-group-item"><input type="hidden" class="playerId" value="'
						+ value.id + '">' + value.name + '</li>');
	});
	$("#playerList").append('</ul>');
}

function loadPlayerList() {
	$.ajax({
		type : 'GET',
		url : "rest/game/getUsers",
		cache : false,
		success : function(list) {
			showPlayerList(list);

			if(list.length === 0) {
				location.href="menu.html";
			}
			if (list.length === 1) {
				$('#startButton').prop('disabled', true);
			} else {
				$('#startButton').prop('disabled', false);
			}
			
			setTimeout(loadPlayerList, 1000);
		}
	});
}

function loadGameName() {
	$.ajax({
		type : 'GET',
		url : "rest/game/get",
		cache : false,
		success : function(game) {
			if(!game.name || game.name === "undefined") {
				location.href="menu.html";
			}
			$("#gameNameId").html(game.name);
		}
	});
}

function startGame() {
	location.href="game.html";
}

$(document).ready(function() {
	loadGameName();
	loadPlayerList();
	$('#startButton').click(function(){
		startGame();
	});
	
});