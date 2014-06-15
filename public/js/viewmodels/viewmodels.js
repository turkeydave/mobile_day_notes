// main app viewmodel (controller) - definately proprietary to knockout.js

// main app viewmodel - small app so one main view model
//
function AppViewModel(dataservice, socketservice){
    var self = this,
        _dataService = dataservice,
        _socketService = socketservice;
    self.user = ko.observable();
    self.userDisplayName = ko.computed(function(){
        if(self.user() && self.user().name){
            return self.user().name;
        }else{
            return '... user loading ...';
        }
    }, self);
    self.notes = ko.observableArray();
    self.listNotesForUser = function(){
        // test modal
        var currUser = self.user();
        _dataService.listNotesForUser(currUser.name,
            function(notes){
                self.notes(notes);
                if(notes && notes.length > 0){
                    $('#noNotesYet').hide();
                    $('#notesDiv').fadeIn();
                }else{
                    $('#noNotesYet').show();
                    $('#notesDiv').hide();
                }
            }
        );
    };
    // for now in liew of login ... set current user
    self.seedUser = function(){
        _dataService.listUsers(function(users){
            if(users && users.length > 0){
                self.user(users[0]);
                self.listNotesForUser();
            }else{
                self.user({
                   name: 'the user',
                   title: 'the man',
                   email: 'fake@fake.gov',
                   password: 'password'
                });
            }
        });
    };

    // todo: put this in its own observable, but for now its only a coupla fields
    self.newNoteCat = ko.observable('');
    self.newNoteNote = ko.observable('');

    self.addNewNote = function(){
        var currUser = self.user(),
            cat = self.newNoteCat(),
            note = self.newNoteNote();

        // rudimentary validation
        if(!cat || cat.length == 0){
            $('#frmCatGroup').addClass('has-error');
            return true;
        }else{
            $('#frmCatGroup').removeClass('has-error');
        }
        if(!note || note.length == 0){
            $('#frmNoteGroup').addClass('has-error');
            return true;
        }else{
            $('#frmNoteGroup').removeClass('has-error');
        }

        // craft the new note payload
        var newNote = {
            category: cat,
            note: note,
            user : currUser.name
        };

        // call data service async
        _dataService.addNote(newNote, function(note){
            // add note to our collection
            self.notes.push(note);
            // clear form
            self.newNoteCat('');
            self.newNoteNote('');

            // broadcast the new note added message via socket.io
            _socketService.sendNewNoteMessage(note);
        });
    };

    // helper to pretti-fy the date
    self.prettyDate = function(note){
        if(note && note.created){
            var date = new Date(note.created);
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }else{
            return 'wah wahhhhhh';
        }
    };
    // nuke note
    self.nukeNote = function(){
        if(this){
            var note = this;
            _dataService.nukeNote(note._id, function(){
                self.notes.remove(note);
                // broadcast the new note added message via socket.io
                _socketService.sendNoteNukedMessage(note);
            });
        }
    };

    // part of the great collossal hack (will come back if time)
    self.addExternalNoteToCollection = function(note){
        self.notes.push(note);
    };
    self.removeExternalNoteFromCollection = function(note){
        // need to find our note
        var notes = self.notes(),
            toNuke = null;
        for(var i= 0, l=notes.length; i<l; i++){
            if(note._id == notes[i]._id){
                toNuke = notes[i];
                break;
            }
        }
        self.notes.remove(toNuke);
    };

}  // viewmodel
