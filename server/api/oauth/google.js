const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../users/user.model');


passport.use(
  new GoogleStrategy({
      clientID: '371068491564-g9cfu4bi76fmjvo2tampom75h23p19u4.apps.googleusercontent.com',
      clientSecret: 'zSWrZW8HXVJe_sW0FNJpih0C',
      callbackURL: 'http://localhost:8080/api/auth/google/callback'
    },
    // Google will send back the token and profile
    function (token, refreshToken, profile, done) {
      // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.

      const info =  {
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos ? profile.photos[0].value : undefined
      };

      User.findOrCreate({
          where: {
            googleId: profile.id
          },
          defaults: info
        }
      ).spread( function (user) {
        done(null, user)

      })
        .catch(done)


    })
);

