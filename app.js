
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , assets = require('connect-assets');

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');
require('./models/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(assets({
    src: 'public',
    helperContext: app.locals
}));
app.locals.js.root = '/javascripts';
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// user resource
var user = require('./routes/user');
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/api/users', user.list);
app.get('/api/users/:id', user.show);
app.put('/api/users/:id', user.update);
app.post('/api/users', user.create);
app.delete('/api/users/:id', user.remove);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
