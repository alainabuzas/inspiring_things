//Require and global variables
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

// Routes

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureFlash: 'Hmmm... some of that information is incorrect. Please try again.',
    successRedirect: '/create',
    failureRedirect: '/auth/login',
}));

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', function(req, res, next) {
    db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'password': req.body.password
        }
    }).spread(function(user, wasCreated) {
        if (wasCreated) {
            passport.authenticate('local', {
                successRedirect: '/profile',
                failureFlash: 'Hmm... something went wrong. Please try again.',
                failureRedirect: '/login',
            })(req, res, next)
        } else {
            req.flash('error', 'That email already exists in our system. Please try logging in.'),
                res.redirect('/auth/login');
        }
    }).catch(function(error) {
        req.flash('error', error.message);
        res.redirect('/auth/signup');
    })
});
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// Facebook Auth
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/callback/facebook', passport.authenticate('facebook', {
    successRedirect: '/create',
    failureRedirect: '/auth/login',
}));

// Export
module.exports = router;
