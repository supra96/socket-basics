//this is front end code

var socket=io(); //io isnt created by you, its defined
                     // by socket io library
socket.on('connect', function(){
	console.log('Connected to socket.io server');
});
socket.on('message',function (message){
console.log('New message');
console.log(message.text);
jQuery('.messages').append('<p>' + message.text +'</p>');
});

//Handles submitting of new message
var $form = jQuery('#message-form');//selector is a way to tak an element out of the html
     var $m= $form.find('input[name=messageUain]');
                                  //$ means this var store a jquery instance, hence it has acces to all jquery methos n stuff.
 $form.on('submit', function (event){  //annoymous function
		event.preventDefault(); //lets you submit w/o refreshing the whole page
  	socket.emit('message', {
  		text: $m.val() //find lets you search inside of an element 
  	                                                       //val lets you fetch the actual data
  	});
  	$m.val(''); // ghost text on edit text

  }) ;                                     