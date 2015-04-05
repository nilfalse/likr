function showMenu() {
	location.href = "menu.html";
}

function createUser() {
	var userName = $("#userName").val();
	var params = "name=" + userName;
	$.ajax({
		type : 'POST',
		url : "rest/user/create",
		cache : false,
		data : params,
		success : function(data) {
			showMenu();
		}
	});
}

$(document).ready(function() {
	$('#loginButton').click(function() {
		createUser();
	});
});