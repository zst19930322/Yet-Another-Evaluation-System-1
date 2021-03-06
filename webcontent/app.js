var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var database = require('./model/db');
mongoose.connect('mongodb://localhost/labelPlatform');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error!'));
var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var askImage = require('./routes/askImage');
var label = require('./routes/label');
var filter = require('./routes/filter');
var calculate = require('./routes/calculate');
var askValidate = require('./routes/askValidate');
var validateImg = require('./routes/validate');
var overview = require('./routes/overview');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/askImage', askImage);
app.use('/label', label);
app.use('/filter', filter);
app.use('/calculate', calculate);
app.use('/Image', express.static(path.join(__dirname,'Image')));
app.use('/askValidate', askValidate);
app.use('/validate', validateImg);
app.use('/overview', overview);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
