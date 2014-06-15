
// basically SPA, so only one view.... skipping jade for now and just returning this html file ....
exports.index = function(req, res){
    res.send('./public/index.html');
    //res.render('index');
};

// other entry points or partials can go here ......

//exports.partials = function (req, res) {
//  var name = req.params.name;
//  res.render('partials/' + name);
//};