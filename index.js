var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var count = 0;

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){


    console.log('a user connected');
    socket.emit('message', { some: 'data' });

    socket.on('new-message', function(data){
        console.log(data);
        socket.emit('message', data);
    });

    setInterval(function() {
        socket.emit('count', count++);
        console.log(count);
    }, 2000);

    setInterval(function() {
        socket.emit('message', 'message ' + count);
        console.log(count);
    }, 10000);


});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

