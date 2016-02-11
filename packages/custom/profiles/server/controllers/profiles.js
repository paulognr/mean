'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require('meanio').loadConfig(),
    jwt = require('jsonwebtoken');

module.exports = function(MeanUser) {
    return {
        create: function(req, res, next) {
            var user = new User(req.body);

            user.provider = 'local';

            req.assert('name', 'You must enter a name').notEmpty();
            req.assert('email', 'You must enter a valid email address').isEmail();
            req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
            req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);
            req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
            req.assert('roles', 'Role is required').isLength(1);

            var errors = req.validationErrors();
            if (errors) {
                return res.status(400).send(errors);
            }

            user.roles.push('authenticated');
            user.save(function(err) {
                if (err) {
                    switch (err.code) {
                        case 11000:
                        case 11001:
                            res.status(400).json([{
                                msg: 'Username already taken',
                                param: 'username'
                            }]);
                            break;
                        default:
                            var modelErrors = [];

                            if (err.errors) {

                                for (var x in err.errors) {
                                    modelErrors.push({
                                        param: x,
                                        msg: err.errors[x].message,
                                        value: err.errors[x].value
                                    });
                                }

                                res.status(400).json(modelErrors);
                            }
                    }
                    return res.status(400);
                }

                var payload = user;
                payload.redirect = req.body.redirect;
                var escaped = JSON.stringify(payload);
                escaped = encodeURI(escaped);
                req.logIn(user, function(err) {
                    if (err) { return next(err); }

                    MeanUser.events.publish({
                        action: 'created',
                        user: {
                            name: req.user.name,
                            username: user.username,
                            email: user.email
                        }
                    });

                    // We are sending the payload inside the token
                    var token = jwt.sign(escaped, config.secret, { expiresInMinutes: 60*5 });
                    res.json({
                        token: token,
                        redirect: config.strategies.landingPage
                    });
                });
                res.status(200);
            });
        }
    }
}
