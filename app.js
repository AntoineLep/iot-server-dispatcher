'use strict';

var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var helmet      = require('helmet');
var jwt         = require('jsonwebtoken');
var appRepo     = require('./repositories/appRepository');
var appService  = require('./services/appService');

var index = require('./routes/index');

var auth  = require('./routes/api/v1/auth')
var devices = require('./routes/api/v1/devices')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
})


/**
* Public routes
*/

app.use('/api/v1/auth', auth);

// Authentication
app.use((req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({success: false, message: 'Failed to authenticate token'});
      } else {
        req.decoded = decoded; // Save it for the other routes
        if(!req.decoded.isGateway) {
          appRepo.findAppById(req.decoded.appId).then((app) => {
            if(app != null) {
              next();
            }
            else {
              return res.status(400).json({success: false, message: 'This token doesn\'t identify a valid user'});
            }
          });
        }
        else {
          return res.status(400).json({success: false, message: 'Gateways are not allowed to access the api'})
        }
      }
    });
  } else {
    return res.status(401).send({success: false, message: 'No token provided'});
  }
});

// Api access counter
app.use((req, res, next) => {
  appService.incrementRequestNumber(req.decoded.appId).then((success) => {
    if(success) {
      next();
    }
  });
});

/**
* Private routes
*/

app.use('/api/v1/devices', devices);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  let _details = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log({success: false, message: err.message, details: _details});
  res.json({success: false, message: 'Something went wrong :/'});
});

module.exports = app;
