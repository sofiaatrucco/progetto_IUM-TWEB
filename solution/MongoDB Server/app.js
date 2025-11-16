var express = require('express'); // Express.js framework for building the web server.
var path = require('path'); // Path module for handling and transforming file paths.
var cookieParser = require('cookie-parser'); // Middleware for parsing cookies.
var logger = require('morgan'); // HTTP request logger middleware.
const database = require("./databases/database"); // Database configuration and connection setup.

const swaggerUi = require('swagger-ui-express'); // Swagger UI for API documentation.
const openApiDocumentation = require('./swagger/swaggerDocumentation.json'); // OpenAPI (Swagger) specification.

var club_gamesRouter = require('./routes/club_games'); // Router for 'club_games'.
var appearancesRouter = require('./routes/appearances'); // Router for 'appearances'.
var game_eventsRouter = require('./routes/game_events'); // Router for 'game_events'.
var game_lineupsRouter = require('./routes/game_lineups'); // Router for 'game_lineups'.
var gamesRouter = require('./routes/games'); // Router for 'games'.
var usersRouter = require('./routes/users'); // Router for 'users'.

var app = express(); // Initialize an Express application

app.use(logger('dev')); // Use morgan logger middleware in development mode to log HTTP requests
app.use(express.json()); // Parse incoming request bodies with JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse incoming request bodies with URL-encoded payloads
app.use(cookieParser()); // Parse cookies attached to the client request object
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

app.use('/mongo', club_gamesRouter); // Route for handling club games requests
app.use('/mongo', appearancesRouter); // Route for handling appearances requests
app.use('/mongo', game_eventsRouter); // Route for handling game events requests
app.use('/mongo', game_lineupsRouter); // Route for handling game lineups requests
app.use('/mongo', gamesRouter); // Route for handling games requests
app.use('/users', usersRouter); // Route for handling users requests

// Sets up Swagger UI to serve interactive API documentation.
app.use('/api-docs',
    swaggerUi.serve, // Serves the Swagger UI static files.
    swaggerUi.setup(openApiDocumentation) // Sets up Swagger UI with the OpenAPI specification from 'swaggerDocumentation.json'.
);

// Export the configured Express application.
module.exports = app;
