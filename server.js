var PORT = process.env.PORT || 3000;
var express=require('express');
var app=express();
var http =require('http').Server(app);
var io=require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

io.on('connection', function (socket) {//if you put socket param in function, it refers to individual socket
	console.log('user connected via socket.io');
	socket.on('message', function (message){
		console.log('Message received: '+ message.text)
		//io.emit - sends it to everyone including the one who sent it
		socket.broadcast.emit('message',message);//sends the message to everyboday but the one who sent it
	});

	socket.emit('message',{
		text:'Welcome to the chat application!'

	});
}); //listin for events

http.listen(PORT, function () {
	console.log('Server started!');
});