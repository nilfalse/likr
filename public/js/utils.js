function getQueryParams(name) {
	var params = window.location.search.substr(1).split("&"),
	    p, hash = {}, i = params.length;
	while (i--) {
		p = params[i].split("=");
		hash[p[0]] = p[1];
	}
	return undefined === name ? hash : hash[name];
}