var passport = require('passport');
var twitchStrategy = require('./authStrategy');

passport.use(twitchStrategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;