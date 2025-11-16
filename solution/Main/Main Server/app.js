// Core module and package imports.
var createError = require('http-errors'); // Utility to create HTTP errors.
var express = require('express'); // Express.js framework.
var path = require('path'); // Utility for working with file and directory paths.
var cookieParser = require('cookie-parser'); // Middleware to parse cookies.
var logger = require('morgan'); // HTTP request logger middleware.

// Import Swagger UI and the OpenAPI documentation.
const swaggerUi = require('swagger-ui-express'); // Swagger UI middleware for Express.
const openApiDocumentation = require('./swagger/swaggerDocumentation.json'); // The OpenAPI documentation for the app.

// Routers for different parts of the application.
var homeRouter = require('./routes/homepage');
var competitionRouter = require('./routes/competitionpage');
var clubRouter = require('./routes/clubpage');
var playerRouter = require('./routes/playerpage');
var usersRouter = require('./routes/users');

var app = express(); // Initialize the Express application.

// Middlewares setup.
app.use(logger('dev')); // Use morgan logger in development mode.
app.use(express.json()); // Parse JSON payloads in incoming requests.
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads.
app.use(cookieParser()); // Parse cookies in incoming requests.
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory.
app.use(express.static(path.join(__dirname, 'socket.io'))); // Serve static files from 'socket.io' directory.

// Route handlers.
app.use('/', homeRouter); // Use the homeRouter for requests to the homepage.
app.use('/', competitionRouter); // Use the competitionRouter for requests to competition pages.
app.use('/', clubRouter); // Use the clubRouter for requests to club pages.
app.use('/', playerRouter); // Use the playerRouter for requests to player pages.
app.use('/', usersRouter); // Use the usersRouter for requests related to users.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation)); // Use Swagger UI for API documentation.

// Catch 404 (Not Found) errors and forward them to the error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler middleware.
app.use(function(err, req, res, next) {
  // Set locals, providing error details only in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page.
  res.status(err.status || 500);
  res.render('error');
});

// Export the configured Express application.
module.exports = app;
