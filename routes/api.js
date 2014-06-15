
// bring in our models and mongoose schema definitions
var Note = require('./../app/models/Note'),
    User = require('./../app/models/User');

// --------------- user endpoints
exports.listUsers = function(req, res){
    return User.find(function(err, users){
        if(!err){
            return res.send(users);
        }else{
            return console.log(err);
        }
    });
};

//
//exports.authenticateUser = function(req, res){
//
//};

exports.addUser = function (req, res) {
    var newUser;
    //console.log(req.body);
    newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        title: req.body.title
    });
    // async
    newUser.save(function (err) {
        if (!err) {
            console.log("created");
            return res.send(newUser);
        } else {
            return console.log(err);
        }
    });
};

// --------------- notes endpoints
//  note: here params.user == user's name, not id: i store user name on note obj.
exports.listNotesForUser = function(req, res){
    var usersName = req.params.user;
    return Note.find({'user':usersName}, function (err, notes) {
        if (!err) {
            return res.send(notes);
        } else {
            return console.log(err);
        }
    });
};

exports.addNote = function(req, res){
    var newNote;
    //console.log(req.body);
    newNote = new Note({
        note: req.body.note,
        category: req.body.category,
        user: req.body.user
    });
    // async
    newNote.save(function (err) {
        if (!err) {
            console.log("note created");
            return res.send(newNote);
        } else {
            return console.log(err);
        }
    });
};

//exports.updateNote =  function(req, res){
//        //User.findById(noteId)
//};

exports.nukeNote = function(req, res){
    return Note.findById(req.params.id, function (err, note) {
        return note.remove(function (err) {
            if (!err) {
                console.log("note removed");
                return res.send('');
            } else {
                return console.log(err);
            }
        });
    });
};


