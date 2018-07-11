require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJwt = require('express-jwt');

require('./app_api/models/db');

const apiRoutes = require('./app_api/routes/index');

const app = express();

app.use(logger('dev'));
//enable all CORS requests - not advisable in production environments.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build'))); 

// view engine setup. Not required if using Angular frontend.
 app.set('views', path.join(__dirname, 'app_server', 'views'));
 app.set('view engine', 'pug');

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
// app.use(expressJwt({
//   secret: process.env.NVM_API_TOKEN,
//   getToken: function (req) {
//       if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//           return req.headers.authorization.split(' ')[1];
//       } else if (req.query && req.query.token) {
//           return req.query.token;
//       }
//       return null;
//   }
// }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// allow access control allow origin from http://localhost:4200 so http://localhost:3000:/api can be acccesed from Angular frontend.
// not needed if also using app.use(cors());
// app.use('/api', function(req, res, next) {   
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');   
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');   
//   next(); 
// });

// app.use(function(req, res, next) {
//       res.Header('Access-Control-Allow-Origin', '*');
//       res.Header('Content-Type', 'application/x-www-form-urlencoded');
//       res.Header('Authorization', 'Basic ' + process.env.NVM_Secret_Base64);
//     next();
// });

// routes
app.use('/api', apiRoutes);

app.use('/api/users', require('./app_api/controllers/users.controller'))

app.get(/(\/about)|(\/agent\/[a-z0-9]{24})|(\/listagents\/[a-z0-9]{24})/, function(req, res, next) {
   res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
}) 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
