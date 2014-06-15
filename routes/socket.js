//var clients = []

// export function for listening to the socket
module.exports = function (socket) {
    //clients.push(socket.id);

    // hello from server
//    socket.emit('hellofromsocket', {
//        'msg': 'Node server welcomes you ...'
//    });

    // new note added message, broadcast to all other connected clients
    socket.on('note:newnote', function(newnote){
        socket.broadcast.emit('note:newnote', newnote); // sends to all but current socket
        // note, actual list of  sockets is socket.server.socket.sockets
        //socket.server.sockets.emit('note:newnote', newnote); // sends to all
    });

    // note nuked message, broadcast to all other connected clients
    socket.on('note:notenuked', function(note){
        socket.broadcast.emit('note:notenuked', note); // sends to all but current socket
    });
};