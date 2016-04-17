//this is front end code

var socket=io(); //io isnt created by you, its defined
                     // by socket io library
var name=getQueryVariable('name')|| 'Anon';
var room=getQueryVariable('room');
console.log(name+ ' wants to join ' + room);
jQuery('.room-title').text(room);
socket.on('connect', function(){
	console.log('Connected to socket.io server');
  socket.emit('joinRoom', {
    name: name,
    room: room
  });//its your method, not premade. but you gotta be consistent with it in both front and back ends

});
socket.on('message',function (message){
  var momentTimeStamp=moment.utc(message.timestamp); 
  var $message=jQuery('.messages');
console.log('New message');
console.log(message.text);
$message.append('<p><strong>'+ message.name+' : ' +message.text+' '+ momentTimeStamp.local().format('h:mm a ')+'</strong></p>');
//$message.append('<p>'+ message.text + '</p>');
});

//Handles submitting of new message
var $form = jQuery('#message-form');//selector is a way to tak an element out of the html
     var $m= $form.find('input[name=messageUain]');
                                  //$ means this var store a jquery instance, hence it has acces to all jquery methos n stuff.
 $form.on('submit', function (event){  //annoymous function
		event.preventDefault(); //lets you submit w/o refreshing the whole page
  	socket.emit('message', {
      name:name,
  		text: $m.val() //find lets you search inside of an element 
  	                                                       //val lets you fetch the actual data
  	});
  	$m.val(''); // ghost text on edit text

  }) ;                                     