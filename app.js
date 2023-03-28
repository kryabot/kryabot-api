// Main includes
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');
var util = require('util');
var crypto = require('crypto');
let InternalOAuthError = require('passport-oauth').InternalOAuthError;
const accessController = require('./controllers/auth/accessController');
const Airbrake = require('@airbrake/node');
const airbrakeExpress = require('@airbrake/node/dist/instrumentation/express');

const airbrake = new Airbrake.Notifier({
    projectId: 475949,
    projectKey: '5961888fad8be21849e1fc6d3da6bf18',
    keysBlocklist: [
        'access_token',
    ]
});
airbrake.addFilter((notice) => {
    notice.context.environment = 'production';
    let url =  new URL(notice.context.url);

    let token = url.searchParams.get('access_token');
    if(token){
        let halfLength = (token.length) / 2;
        token = token.substr(0, halfLength) + "*".repeat(token.length - halfLength);

        url.searchParams.set('access_token', token);
        notice.context.url = url.toString();
    }

    return notice;
});

var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// Root routes inclues
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var publicRouter = require('./routes/public');

var app = express();

// Util includes
var passport = require('./util/security/passport');
var corsOptions = require('./util/corsOptions');
var accessLogStream = require('./util/logging');

// setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(airbrakeExpress.makeMiddleware(airbrake));
app.use(cors(corsOptions));
app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json({verify: function(req, res, buf, encoding){
    const messageId = req.header("Twitch-Eventsub-Message-Id");
    const timestamp = req.header("Twitch-Eventsub-Message-Timestamp");
    const messageSignature = req.header("Twitch-Eventsub-Message-Signature");

    if(messageSignature) {
        let calculated = 'sha256=' + crypto.createHmac('sha256', 'supermegasecret').update(messageId + timestamp+ buf).digest('hex');
        req.twitch_verified = messageSignature === calculated;
    }
}}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });

// Access logging
app.use(accessController.registerHandler);

// Authorized API only
app.use('/auth', passport.authenticate('twitch-token'), indexRouter);

// different Twitch logins for multiple purposes
app.use('/public', publicRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.send()
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(airbrakeExpress.makeErrorHandler(airbrake));
// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  if(err instanceof  InternalOAuthError){
      res.status(401);
      res.send(err.data)
  } else {
      res.status(err.status || 500);
  }
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  //res.locals.error = err
  // render the error page

  res.send();
});



module.exports = app;
