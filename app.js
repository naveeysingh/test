var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routes for the pages
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Serve static files (like images and CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the view engine
app.set('views', path.join(__dirname, 'views')); // Views folder location
app.set('view engine', 'hbs'); // Use Handlebars (hbs) for rendering views

// Middleware for logging requests in the console
app.use(logger('dev'));

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies
app.use(cookieParser());

// Define routes to handle incoming requests
app.use('/', indexRouter);  // Route for home page
app.use('/users', usersRouter);  // Route for users page

// Catch 404 errors (when route is not found) and forward them to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
  // Provide error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // Render the error page with status code (500 for server error)
  res.status(err.status || 500);
  res.render('error');
});

// Export the app
module.exports = app;
