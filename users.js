const Models = require("./models");
const Users = Models.User;
const Movies = Models.Movie;


// CREATE - Create and add new user
function handlePostUsers() {
    return (req, res) => {
        const name = req.body.Name;
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
    };
}

// CREATE AND DELETE ROUTES - Add and delete favorite movies from user by movie title
function handlePostUserMoviesByTitle() {
    return (req, res) => {
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
    };
}

function handleDeleteUserMovieByTitle() {
    return (req, res) => {
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
                            (err) => {
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
    };
}

// UPDATE AND DELETE ROUTES - Update and remove user info by username
function handlePutUserByName() {
    return (req, res) => {
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
    };
}

function handleDeleteUserByName() {
    return (req, res) => {
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
    };
}

module.exports = {handlePostUsers, handlePostUserMoviesByTitle, handleDeleteUserMovieByTitle, handlePutUserByName, handleDeleteUserByName};
