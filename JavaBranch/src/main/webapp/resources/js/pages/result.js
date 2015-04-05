function rightAnswersCount() {
	$.ajax({
		type : 'GET',
		url : "rest/game/rightAnswersCount",
		cache : false,
		success : function(result) {
			$("#menuRegion h1").html("Result("+result/5*100+"%)")
			console.log(result);
			var sets = [ {
				sets : [ '' ],
				size : 5
			}, {
				sets : [ " " ],
				size : 5
			}, {
				sets : [ '', " " ],
				size : 0
			} ];
			sets[2].size = result;
			var chart = venn.VennDiagram();
			d3.select("#venn").datum(sets).call(chart);
		}
	});
}

$(document).ready(function() {
	rightAnswersCount();

});