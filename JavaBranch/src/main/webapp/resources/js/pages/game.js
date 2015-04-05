function loadQuestion() {
	$.ajax({
		type : 'GET',
		url : "rest/question/get",
		cache : false,
		success : function(question) {
			if (!question.id) {
				location.href = "result.html";
			} else if ($("#answer1").children('img').attr('id') == question.answers[0].id){
				$("#waitingAlert").show();
			} else {
				$("#waitingAlert").hide();
				$("#answer1").html(
						"<img id='" + question.answers[0].id
								+ "' src='resources/images/"
								+ question.answers[0].description + "'>");
				$("#answer2").html(
						"<img id='" + question.answers[1].id
								+ "' src='resources/images/"
								+ question.answers[1].description + "'>");
			}
			setTimeout(loadQuestion, 1000);
		}
	});
}

function saveAnswer(answerId) {
	var params = "answerId=" + answerId;
	$.ajax({
		type : 'POST',
		url : "rest/question/answer",
		cache : false,
		data : params,
		success : function(question) {
			loadQuestion();
		}
	});
}
$(document).ready(function() {
	loadQuestion();

	$("#answer1").click(function(e) {
		e.preventDefault();
		var id = $(this).children('img').attr('id');
		saveAnswer(id);
	});

	$("#answer2").click(function(e) {
		e.preventDefault();
		var id = $(this).children('img').attr('id');
		saveAnswer(id);
	});
});