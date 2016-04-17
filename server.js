var PORT = process.env.PORT || 3000;
var express=require('express');
var app=express();
var http =require('http').Server(app);
var io=require('socket.io')(http);
var moment=require('moment');

app.use(express.static(__dirname+'/public'));
var clientInfo={}; //key-value pairs with key- socket id, value-room name


io.on('connection', function (socket) {//if you put socket param in function, it refers to individual socket
	console.log('user connected via socket.io  : '+socket.id);
	socket.on('joinRoom', function (req){
		clientInfo[socket.id]=req; //stores the unique id in this variable. from here, look at the look at the io.to method
		socket.join(req.room);  //this is a premade method. It joins the room that the "req" object is carrying
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});
	socket.on('message', function (message){
		console.log('Message received: '+ message.text)
		//io.emit - sends it to everyone including the one who sent it
		message.timestamp=moment().valueOf();

		io.to(clientInfo[socket.id].room).emit('message',message);//sends the message to everyboday but the one who sent it  //new comment- sends stuff to people only in that room
	//io.to gets the room name in the square brackets
	});

	socket.emit('message',{
		name: 'System',
		text:'Made by-Supratik, Yorku Toronto. Please do not duplicate, even though you may not have the knowledge to.',
		timestamp: moment().valueOf()
	});
}); //listin for events

http.listen(PORT, function () {
	console.log('Server started on port 3000!');
});