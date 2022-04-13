const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let fs = require('fs');
let path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
const cors = require('cors');
const handleLogin = require("./auth");
const {handlePostUsers, handlePostUserMoviesByTitle, handleDeleteUserMovieByTitle, handlePutUserByName,
    handleDeleteUserByName, validateUserBody} = require("./users");
const {handleGetMovies, handleGetMovieByTitle, handleGetGenreByName, handleGetDirectorByName} = require("./movies");


const app = express();
const port = process.env.PORT || 8080;



// CONNECT DATABASE AND REST API
mongoose.connect('process.env.CONNECTION_URI', {useNewUrlParser: true, useUnifiedTopology: true});


// LOGGING
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


// DOCUMENTATION
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/documentation.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// BODY PARSER
app.use(bodyParser.json());


// CORS MIDDLEWARE (SELECTION OF ALLOWED ORIGINS)
app.use(cors());


// PASSPORT
const passport = require('passport');
require('./passport');


// AUTHENTICATION
app.post('/login', handleLogin);


// // DEFAULT TEXT RESPONSE AT /
// app.get('/', (req, res) => {
//     res.send('Welcome to my Movie API')
// });


// QUERIES TO USER ENDPOINTS
app.post('/users', validateUserBody, handlePostUsers());

app
    .route('/users/:Name/movies/:Title')
    .post(passport.authenticate('jwt', {session: false}), handlePostUserMoviesByTitle())
    .delete(passport.authenticate('jwt', {session: false}), handleDeleteUserMovieByTitle());

app
    .route('/users/:Name')
    .put(passport.authenticate('jwt', {session: false}), validateUserBody,handlePutUserByName())
    .delete(passport.authenticate('jwt', {session: false}), handleDeleteUserByName());


// QUERIES TO MOVIE ENDPOINTS
app.get('/movies', passport.authenticate('jwt', {session: false}), handleGetMovies());

app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), handleGetMovieByTitle());

app.get('/movies/genre/:Name', passport.authenticate('jwt', {session: false}), handleGetGenreByName());

app.get('/movies/director/:Name', passport.authenticate('jwt', {session: false}), handleGetDirectorByName());


// CUSTOM ERROR FUNCTION
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


// LISTEN FOR REQUESTS
app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
});
