var socket = io();

socket.emit("game join", getQueryParam("_id"));