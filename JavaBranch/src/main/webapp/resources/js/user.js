function showCurrentUser() {
	$.ajax({
        type:'GET',
        url: 'rest/user/get',
        cache:false,
        success: function(user) {
        	if(!user.name || user.name === "undefined") {
        		location.href="index.html";
        	}
        	$('#userRegion').html("Welcome, " + user.name);
        }
    });
}

$(document).ready(function() {
		showCurrentUser();
});