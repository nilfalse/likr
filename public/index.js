if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(pos) {
		var geo = pos.coords;
		console.log(geo);
		// post({ geo: [geo.longitude, geo.latitude] });
		get([geo.longitude, geo.latitude]);

	},
	function(err) {
		console.error(err);
		alert("ERROR! " + err.message);
	});
} else {
	alert('ERROR! Geolocation not supported');
}

function post(geo) {
	$.ajax('/proposals', {
		type: 'POST',
		contentType: 'application/json',

		data: JSON.stringify($.extend(geo, {
			currency: "USD",
			amount: "1,000"
		})),

		success: function(data, status, jqXHR) {
			console.log(arguments);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(arguments);
		}
	});
}

function get(geo) {
	$.ajax('/proposals', {
		data: {
			geo: geo
		},

		success: function(data) {
			console.log(data);
		}
	});
}

