var socket=io(); //io isnt created by you, its defined
                     // by socket io library
socket.on('connect', function(){
	console.log('Connected to soxket.io server');
});