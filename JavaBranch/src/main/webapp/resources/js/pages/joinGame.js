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

function showGameList(list) {
	if (!list.length) {
		return;
	}

	$("#gameList").append('<ul class="list-group">');
	$.each(list, function(index, value) {
		$("#gameList").append(
				'<li class="list-group-item"><input type="hidden" class="gameId" value="'
						+ value.id + '">' + value.name + '</li>');
	});
	$("#gameList").append('</ul>');
	$("#gameList li.list-group-item").click(function() {
		var gameId = $(this).children("input.gameId").val();
		joinGame(gameId);
	});
}

function loadGameList() {
	$.ajax({
		type : 'GET',
		url : "rest/game/getAll",
		cache : false,
		success : function(list) {
			showGameList(list);
		}
	});
}

$(document).ready(function() {
	loadGameList();
});