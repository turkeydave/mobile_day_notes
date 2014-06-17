// new SocketService actual constructor, also now have a way to set some callbacks for when our socket service receives messages
//      from other connected clients.

function SocketService(io){
    this.socket = io.connect();
    this.newNoteCallback = function(){};
    this.noteNukedCallback = function(){};

    var self = this;
    this.socket.on('note:newnote', function (note) {
        self.newNoteCallback(note);
    });

    this.socket.on('note:notenuked', function (note) {
        self.noteNukedCallback(note);
    });
}

SocketService.prototype.setCallbacks = function(newNoteCallback, noteNukedCallback){
    this.newNoteCallback = newNoteCallback;
    this.noteNukedCallback = noteNukedCallback;
};
SocketService.prototype.sendNewNoteMessage = function(newNote){
    this.socket.emit('note:newnote', newNote);
};

SocketService.prototype.sendNoteNukedMessage = function(newNote){
    this.socket.emit('note:notenuked', newNote);
};


//
//// attempting to abstract all socket stuff into one place and provide a service for sending messages from browser client.
////      NOTE: not happy with the 'collossal hack' but for now it works, will come back if time
//
//// set socket
//var socket = io.connect();
////socket.on('hellofromsocket', function (data) {
////    var msg = data.msg;
////    $('#greeting').html(msg);
////});
//
//socket.on('note:newnote', function (note) {
//    var msg =  'Hey, theres a new note: ' + note.note;
//    $('#newNoteModalTitle').html('New Note Added');
//    $('#newNoteModalContent').html(msg);
//    $('#msgBox').modal();
//
//    //collossal global hack
//    if(appVM){
//        appVM.addExternalNoteToCollection(note);
//    }
//});
//
//socket.on('note:notenuked', function (note) {
//    var msg =  'Not removed : (_id): ' + note._id;
//    $('#newNoteModalTitle').html('Note Removed');
//    $('#newNoteModalContent').html(msg);
//    $('#msgBox').modal();
//
//    //collossal global hack
//    if(appVM){
//        appVM.removeExternalNoteFromCollection(note);
//    }
//});
//
//var socketservice = {
//    sendNewNoteMessage : function(newNote){
//        socket.emit('note:newnote', newNote);
//    },
//    sendNoteNukedMessage : function(newNote){
//        socket.emit('note:notenuked', newNote);
//    }
//};