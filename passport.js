const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'Name',
    passwordField: 'Password'
}, (name, password, callback) => {
    console.log(name + ' ' + password);
    Users.findOne({Name: name}, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('incorrect user name');
            return callback(null, false, {message: 'Incorrect user name or password.'});
        }
        console.log('finished');
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));