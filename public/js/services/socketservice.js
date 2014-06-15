// attempting to abstract all socket stuff into one place and provide a service for sending messages from browser client.
//      NOTE: not happy with the 'collossal hack' but for now it works, will come back if time

// set socket
var socket = io.connect();
//socket.on('hellofromsocket', function (data) {
//    var msg = data.msg;
//    $('#greeting').html(msg);
//});

socket.on('note:newnote', function (note) {
    var msg =  'Hey, theres a new note: ' + note.note;
    $('#newNoteModalTitle').html('New Note Added');
    $('#newNoteModalContent').html(msg);
    $('#msgBox').modal();

    //collossal global hack
    if(appVM){
        appVM.addExternalNoteToCollection(note);
    }
});

socket.on('note:notenuked', function (note) {
    var msg =  'Not removed : (_id): ' + note._id;
    $('#newNoteModalTitle').html('Note Removed');
    $('#newNoteModalContent').html(msg);
    $('#msgBox').modal();

    //collossal global hack
    if(appVM){
        appVM.removeExternalNoteFromCollection(note);
    }
});

var socketservice = {
    sendNewNoteMessage : function(newNote){
        socket.emit('note:newnote', newNote);
    },
    sendNoteNukedMessage : function(newNote){
        socket.emit('note:notenuked', newNote);
    }
};