const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
let fs = require('fs');
let path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const app = express();
const PORT = 8080;

// CONNECT DATABASE AND REST API
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// LOGGING
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


// DOCUMENTATION
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/documentation.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// BODY PARSER
app.use(bodyParser.json());


// DEFAULT TEXT RESPONSE AT /
app.get('/', (req, res) => {
    res.send('Welcome to my Movie API')
});


// USER ENDPOINTS
// CREATE - Create and add new user
app.post('/users', (req, res) => {
    const name = req.body.Name.trim();
    if (name === '') {
        res.status(400).send('user name is required')
        return;
    }
    Users.findOne({Name: req.body.Name})
        .then((user) => {
            if (user) {
                res.status(409).send(req.body.Name + ' already exists!');
            } else {
                Users
                    .create({
                        Name: req.body.Name,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {
                        res.status(201).json(user)
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send('Error: ' + err);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// CREATE AND DELETE ROUTES - Add and delete favorite movies from user by movie title
app
    .route('/users/:Name/movies/:Title')
    .post((req, res) => {
        Movies.findOne({Title: req.params.Title})
            .then((movie) => {
                if (!movie) {
                    return res.status(404).send('Movie not found');
                }
                Users.findOne({Name: req.params.Name})
                    .then(user => {
                        if (!user) {
                            res.status(404).send('User not found');
                            return;
                        }
                        if (user.FavoriteMovies.includes(movie._id)) {
                            res.status(400).send('Movie already included.');
                            return
                        }
                        Users.findOneAndUpdate(
                            {Name: req.params.Name},
                            {
                                $push: {
                                    FavoriteMovies: movie._id
                                },
                            },
                            {new: true},
                            (err, updatedUser) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Error: ' + err);
                                } else {
                                    res.status(201).json(updatedUser);
                                }
                            }
                        )
                    })
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
    })
    .delete((req, res) => {
            Movies.findOne({Title: req.params.Title})
                .then((movie) => {
                    if (!movie) {
                        return res.status(404).send('Movie not found')
                    }
                    Users.findOne({Name: req.params.Name})
                        .then(user => {
                            if (!user) {
                                return res.status(404).send('User not found')
                            }
                            if (!user.FavoriteMovies.includes(movie._id)) {
                                res.status(304).send('Movie does not exist in list of favorite movies.');
                                return
                            }
                            Users.findOneAndUpdate(
                                {Name: req.params.Name},
                                {
                                    $pull: {
                                        FavoriteMovies: movie._id
                                    },
                                },
                                {new: true},
                                (err, updatedUser) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).send('Error: ' + err);
                                    } else {
                                        res.status(200).send(req.params.Title + ' was deleted from user ' + req.params.Name);
                                    }
                                }
                            )
                        })

                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                });
    });

// UPDATE AND DELETE ROUTES - Update and remove user info by user name
app
    .route('/users/:Name')
    .put((req, res) => {
        Users.findOneAndUpdate(
            {Name: req.params.Name},
            {
                $set: {
                    Name: req.body.Name,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                },
            },
            {new: true},
            (err, updatedUser) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('Error: ' + err)
                } else {
                    res.status(200).json(updatedUser);
                }
            }
        )
    })
    .delete((req, res) => {
        Users.findOneAndRemove({Name: req.params.Name})
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.Name + ' was not found!')
                } else {
                    res.status(200).send(req.params.Name + ' was deleted.');
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });


// MOVIE ENDPOINTS
// READ - Get list of all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then(movies => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ - Get movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({Title: req.params.Title})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});

// READ - Get description of genre by genre's name
app.get('/movies/genre/:Name', (req, res) => {
    Movies.findOne({'Genre.Name': req.params.Name})
        .then((movie) => {
            res.status(200).json(movie.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ - Get data about director by director's name
app.get('/movies/director/:Name', (req, res) => {
    Movies.findOne({'Director.Name': req.params.Name})
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// CUSTOM ERROR FUNCTION
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

// LISTEN FOR REQUESTS
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}!`)
});


