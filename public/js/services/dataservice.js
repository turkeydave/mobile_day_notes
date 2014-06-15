// data service / or data manager
//      for sake of speed make as obj. literal available on global scope
//      note: due to async nature of request calls to our server, all methods take a callback to work when data arrives
var dataservice = {
    listUsers : function(callback){
       $.get( "/api/listUsers").done(function(data) {
            if(data){
                callback(data);
            }else{
                console.log('no data....');
                callback([]);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
           callback([]);
        });
    },

//    authenticateUser: function(email, pass, callback){
//        $.ajax({
//            url: '/api/addNote',
//            data: {
//                email: email,
//                pass:pass
//            },
//            cache: false,
//            dataType: "json",
//            type: "POST"
//        }).done(function(data) {
//           if(data){
//               callback(data);
//           } else {
//               // could return error obj.here and check for it
//               callback(null);
//           }
//        }).fail(function(jqXHR, textStatus, errorThrown) {
//           console.log(errorThrown);
//            callback(null);
//        });
//    },

    listNotesForUser: function(usersName, callback){
        var url = '/api/listNotesForUser/' + usersName;
         $.get(url).done(function(data) {
            if(data){
                callback(data);
            }else{
                console.log('Error loading notes');
                callback([]);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Error loading notes: ' + errorThrown);
             callback([]);
        });
    },

    addNote: function(newNote, callback){
        $.ajax({
            url: '/api/addNote',
            data: newNote,
            cache: false,
            dataType: "json",
            type: "POST"
        }).done(function(data) {
           if(data){
               callback(data);
           } else {
               // could return error obj.here and check for it
               callback(null);
           }
        }).fail(function(jqXHR, textStatus, errorThrown) {
           console.log(errorThrown);
            callback(null);
        });
    },
    nukeNote: function(id, callback){
        $.ajax({
            url: '/api/nukeNote/' + id,
            data: {},
            cache: false,
            dataType: "json",
            type: "DELETE"
        }).done(function(data) {
           if(data){
               callback('success');
           } else {
               callback('error');
           }
        }).fail(function(jqXHR, textStatus, errorThrown) {
           console.log(errorThrown);
            callback(errorThrown);
        });
    }
};
