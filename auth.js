const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); // My local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Name,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

function handleLogin(req, res) {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: 'Credentials do not match',
                user: user
            });
        }
        req.login(user, {session: false}, (error) => {
            if (error) {
                res.send(error);
            }
            let token = generateJWTToken(user.toJSON());
            return res.json({user, token});
        });
    })(req, res);
}

// POST LOGIN
module.exports = handleLogin;