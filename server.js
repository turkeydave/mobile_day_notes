// mobile day note app - main server entry point and app file

// -------- modules ----------------
var mongoose   = require('mongoose'),
    path = require('path'),
    pageRoutes = require('./routes/index'),
    api = require('./routes/api'),
    socketRoutes = require('./routes/socket');
    express = require('express');

// -------- configuration and routes  ----------------
 var app = express(),
        server = require('http').createServer(app),
        ioServer = require('socket.io').listen(server),
        mongooseConfig = require('./config/mongoose'),
        port = process.env.port || 3000;
        ip = process.env.ip;

//var dbConnStr  = 'mongodb://testing_dude:testing_dude@ds041248.mongolab.com:41248/mobile_day';

// configuration
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

// serve index and view partials
app.get('/', pageRoutes.index);
//app.get('/partials/:name', routes.partials);

// api
//app.post('/api/authuser', api.authenticateUser);
app.get('/api/listusers', api.listUsers);
app.post('/api/adduser', api.addUser);
app.post('/api/addnote', api.addNote);

app.get('/api/listNotesForUser/:user', api.listNotesForUser);// here user is uer's name
app.delete('/api/nukeNote/:id', api.nukeNote);

// catchall
app.get('*', pageRoutes.index);

// socket.io
ioServer.sockets.on('connection', socketRoutes);


// -------- mongooose connect, connect events / handling  ----------------
// try connecting
try {
    mongoose.connect(mongooseConfig.connStr);
    console.log("attempting db connection: " + mongooseConfig.connStr);
} catch (err) {
    console.log("connection failed ... " , err.message);
}
mongoose.connection.on("connected", function(ref) {
  console.log("successful connection to:  " + mongooseConfig.connStr);
});

// when throws an error
mongoose.connection.on("error", function(err) {
    console.error('failed to connect: ' + mongooseConfig.connStr, err);
});

// when disconnected
mongoose.connection.on('disconnected', function () {
    console.log('mongoose disconnected from:' + mongooseConfig.connStr);
});

// coupla failsafes to make sure that mongoose connection will close if node ends
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    })
}).on('SIGTERM', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

// -------- start server listing on port  ----------------
server.listen(port, ip, function() {
    console.log('listening on port ' + port);
  });