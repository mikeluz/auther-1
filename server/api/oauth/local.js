var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(

  function(email, password, done) {

    User.findOne({
      where: {
        email: email,
        password: password
      }
    })
    .then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      } else {
        console.log('Login Successfull');
        return done(null, user.id);
      }
    })
    .catch(next);

  }

));

passport.serializeUser(function (user, done) {
  console.log("Serializing...");
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("Deserializing...");
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(done);
});