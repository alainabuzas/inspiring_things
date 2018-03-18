// All requires and global variables
require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var app = express();
var path = require('path');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require('./models');
var request = require('request');
var screenshot = require('url-to-screenshot');
var urlencode = require('urlencode');
var favicon = require('express-favicon');
var fs = require('fs');
// var API = require('screenshot-capture');
// var api = new API({
//     access_key: process.env.ACCESS_KEY,
//     secret_key: process.env.SECRET_KEY
// });

// Set and Use Statments

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static/'));
app.use(ejsLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
})
app.use(favicon(__dirname + '/favicon.png'));

// Routes

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
});

app.get('/instructions', function(req, res) {
    res.render('instructions');
});

app.get('/create', function(req, res) {
    res.render('create');
})

app.get('/getpic', function(req, res) {
    request('https://api.unsplash.com/photos/random?client_id=75ed119a8340d2bb9f1a6c18f08b760f0c3ec4859b1c1395cced95b91a07cce3',
        function(error, response, body) {
            res.send(body);
        });
})

app.get('/getquote', function(req, res) {
    request('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', function(error, response, body) {
        res.send(body);
    });
});


// // download button to screenshot route
// app.get('/downloadimg', function(req, res) {
//     var urltopic = ('/save/:quote/:img', function(req, res) {
//         var decoded = urlencode.decode(req.query.img);
//         var combourl = window.location.href = '/save/' +
//             encodeURIComponent($('#qod-quote').text()) + '/' +
//             encodeURIComponent($('#bigpicture').attr('src'));
//     });
//     screenshot('urltopic', {
//             ignoreSslErrors: true,
//             sslProtocol: any,
//             format: jpg
//         })
//         .width(1200)
//         .height(800)
//         .capture(function(err, img) {
//             if (err) throw err;
//             res.writeHead(200, {
//                 'Content-Type': 'image/png'
//             });
//             res.end(img, 'binary');
//         });


//     app.get('/save/:quote/:img', function(req, res) {
//         console.log(req.query.img)
//         var decoded = urlencode.decode(req.query.img);
//         console.log(decoded)
//         res.render('save', {
//             quote: req.params.quote,
//             img: req.params.img
//         });
//     });


// });

// google analytics



// Controllers
app.use('/auth', require('./controllers/auth'));

// Listen
app.listen(process.env.PORT || 3000);
