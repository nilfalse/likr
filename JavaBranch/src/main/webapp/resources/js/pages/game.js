function loadQuestion() {
	$.ajax({
		type : 'GET',
		url : "rest/question/get",
		cache : false,
		success : function(question) {
			
			$("#answer1").html("<img src='resources/images/"+question.answers[0].description + "'>");
			$("#answer2").html("<img src='resources/images/"+question.answers[1].description + "'>");
		}
	});
}



$(document).ready(function() {
	loadQuestion();
});