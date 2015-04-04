function createGame() {
    $.ajax({
            type:'GET',
            url: "http://localhost:3000",
            cache:false,
            success: function(data) {
                alert(data.response);
            }
	});	            
}

function getGameList() {
    $.ajax({
            type:'GET',
            url: "http://localhost:3000",
            cache:false,
            success: function(data) {
                alert(data.response);
            }
	});	            
}