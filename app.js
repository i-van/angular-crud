
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/users');
require('./models/user');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// user resource
var user = require('./routes/user');
app.get('/api/users', user.list);
app.get('/api/users/:id', user.show);
app.put('/api/users/:id', user.update);
app.post('/api/users', user.create);
app.delete('/api/users/:id', user.remove);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
