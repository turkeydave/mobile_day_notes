var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    note:  String,
    user: String,  // user's name here
    category: String,
    created: { type: Date, default: Date.now }
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;