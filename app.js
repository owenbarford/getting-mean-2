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

var whitelist = ['http://localhost:4200', '//www.suppappuk.com', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(logger('dev'));

// configure CORS
// app.use(cors(corsOptions));

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

app.use('/api', function(req, res, next) {
  var allowedOrigins = ['http://localhost:4200', '//suppappuk.com', 'https://cloud11.contact-world.net'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routes
app.use('/api', apiRoutes);

app.use('/api/users', require('./app_api/controllers/users.controller'))

app.get(/(\/login)|(\/listagents)|(\/users\/register)|(\/users\/authenticate)|(\/about)|(\/agent\/[a-z0-9]{24})|(\/listagents\/[a-z0-9]{24})|(\/profile)|(\/listagents)|(\/phone)|(\/phonestates)|(\/policies\/[a-z0-9])|(\/editpolicy\/[a-z0-9])|(\/newpolicy)/,function(req, res, next) {
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
